

$(document).ready(function () {
  // website lang
  var bodyDir = $("body").css("direction");
  console.log(bodyDir);
  var dirAr;
  if (bodyDir == "rtl") {
    dirAr = true;
  } else {
    dirAr = false;
  }


  // make navbar fixed while scrolling
  window.addEventListener("scroll", () =>
    document.getElementById("mainNav").classList.toggle("fixed", window.scrollY > 40)
  );

  // Scroll to the top of the page
  window.addEventListener('scroll', () => {
    document.getElementById('scrollUp').style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  // CSS class name for dark theme
  const darkTheme = "dark-theme";

  const darkThemeSetUp = () => {
    if (getCurrentTheme() === "dark") {
      document.getElementById("toggleBtn").checked = true;
    } else {
      document.getElementById("toggleBtn").checked = false;
    }
  };



  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";

  //   Get user's theme preference from local storage
  const selectedTheme = localStorage.getItem("selected-theme");
  if (selectedTheme === "dark") {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    darkThemeSetUp();
  }

  const themeButton = document.getElementById("toggleBtn");
  themeButton.addEventListener("change", () => {
    document.body.classList.toggle(darkTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    darkThemeSetUp();
    $('#themeIcon').toggleClass("bi-cloud-moon bi-brightness-high");
  });

  /*
  Clean Arabic Typewriter
  - multiple phrases
  - respects prefers-reduced-motion
  - pause on hover (no control buttons)
*/

  (() => {
    const prefsReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // CONFIG: phrases and speeds
    const phrases = [
      "احجز ملعبك بسهولة مع ماتشي",
      "استكشف الملاعب القريبة واختر الأنسب",
      "ادفع بأمان واحصل على تأكيد فوري"
    ];
    const charDelay = 50;      // ms per character (typing)
    const backspaceDelay = 35; // ms per character when deleting
    const phrasePause = 1000;  // ms pause when phrase complete
    const loop = true;         // loop phrases

    // elements
    const el = document.getElementById('typeText');
    const caret = document.getElementById('caret');

    // state
    let running = true;       // pause/resume on hover
    let currentPhrase = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = null;

    const sleep = (ms) => new Promise(res => { timeoutId = setTimeout(res, ms); });

    // Reduced motion fallback: show first phrase fully
    if (prefsReduce) {
      el.textContent = phrases[0];
      caret.style.opacity = 0.9;
      return;
    }

    // Pause on hover
    const container = document.querySelector('.type-wrap');
    if (container) {
      container.addEventListener('mouseenter', () => running = false);
      container.addEventListener('mouseleave', () => running = true);
    }

    // Main async typing loop
    async function typeLoop() {
      while (true) {
        const phrase = phrases[currentPhrase];

        // Type forward
        while (charIndex < phrase.length) {
          if (!running) { await sleep(100); continue; }
          charIndex++;
          el.textContent = phrase.slice(0, charIndex);
          await sleep(charDelay);
        }

        // after finishing phrase
        await sleep(phrasePause);

        if (!loop) break;

        // delete back (optional loop effect)
        deleting = true;
        while (charIndex > 0) {
          if (!running) { await sleep(100); continue; }
          charIndex--;
          el.textContent = phrase.slice(0, charIndex);
          await sleep(backspaceDelay);
        }
        deleting = false;

        // next phrase
        currentPhrase = (currentPhrase + 1) % phrases.length;
        await sleep(250);
      }
    }

    // start
    typeLoop();

    // expose minimal API if needed later
    window.SimpleTypewriter = {
      pause: () => running = false,
      resume: () => running = true,
      setPhrases: (arr) => { if (Array.isArray(arr) && arr.length) { phrases.length = 0; phrases.push(...arr); currentPhrase = 0; charIndex = 0; el.textContent = ''; } }
    };
  })();


  // toggle password type
  $('.pass').click(function () {
    $(this).children('i').toggleClass("bi-unlock bi-lock");
    var pass = $(this).closest('.input-group').find('input')[0];
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
      pass.setAttribute("type", "password");
    }
  })

  // verification code OTP
  if ($('#verification-input').length > 0) {
    const inputs = Array.from(document.getElementById("verification-input").children);
    function getFirstEmptyIndex() {
      return inputs.findIndex((input) => input.value === "");
    }
    inputs.forEach((input, i) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          if (input.value === "" && i > 0) {
            inputs[i - 1].value = "";
            inputs[i - 1].focus();
          }

          for (let j = i; j < inputs.length; j++) {
            let value = inputs[j + 1] ? inputs[j + 1].value : "";
            inputs[j].setRangeText(value, 0, 1, "start");
          }
        }

        if (e.key === "ArrowLeft" && i > 0) {
          inputs[i - 1].focus();
        }

        if (e.key === "ArrowRight" && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
      });

      input.addEventListener("input", (e) => {
        input.value = "";

        const start = getFirstEmptyIndex();
        inputs[start].value = e.data;

        if (start + 1 < inputs.length) inputs[start + 1].focus();
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();

        const text = (event.clipboardData || window.clipboardData).getData("text");
        const firstEmpty = getFirstEmptyIndex();
        const start = firstEmpty !== -1 ? Math.min(i, firstEmpty) : i;

        for (let i = 0; start + i < inputs.length && i < text.length; i++) {
          inputs[start + i].value = text.charAt(i);
        }

        inputs[Math.min(start + text.length, inputs.length - 1)].focus();
      });

      input.addEventListener("focus", () => {
        const start = getFirstEmptyIndex();
        if (start !== -1 && i > start) inputs[start].focus();
      });
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  // sample path points in screen coordinates and map steps by screen center
  function computeStepFractions_byScreen(svgEl, pathEl, stepEls) {
    const total = pathEl.getTotalLength();
    const samples = [];
    const stepPx = 3; // دقة العيّنة (كل 3px) — قلل لزيادة الدقة
    const svgPoint = svgEl.createSVGPoint();
    const screenCTM = svgEl.getScreenCTM();

    for (let L = 0; L <= total; L += stepPx) {
      const p = pathEl.getPointAtLength(L);
      svgPoint.x = p.x;
      svgPoint.y = p.y;
      const sp = svgPoint.matrixTransform(screenCTM);
      samples.push({ L, x: sp.x, y: sp.y });
    }

    const fractions = [];
    stepEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let best = { L: 0, d: Infinity };
      for (const s of samples) {
        const dx = s.x - cx,
          dy = s.y - cy;
        const d = dx * dx + dy * dy;
        if (d < best.d) best = { L: s.L, d };
      }
      fractions.push(Math.min(1, Math.max(0, best.L / total)));
    });

    return fractions;
  }

  function initAnimation() {
    // cleanup previous
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf("#marker");

    const svg = document.getElementById("rihalSVG");
    const isMobile = window.matchMedia("(max-width:992px)").matches;

    const animPath = isMobile
      ? document.getElementById("straightAnim")
      : document.getElementById("curvedAnim");
    const basePath = isMobile
      ? document.getElementById("straightBase")
      : document.getElementById("curvedBase");
    const stepGroup = isMobile
      ? document.getElementById("straightSteps")
      : document.getElementById("curvedSteps");

    // ensure base dashed
    basePath.setAttribute("stroke-dasharray", isMobile ? "20 20" : "30 30");

    // prepare animated stroke
    const length = animPath.getTotalLength();
    animPath.style.strokeDasharray = length;
    animPath.style.strokeDashoffset = length;

    // step elements (inner circles)
    const stepEls = Array.from(stepGroup.querySelectorAll(".stepInner"));

    // compute fractions (screen based)
    const fractions = computeStepFractions_byScreen(svg, animPath, stepEls);

    // START / END tuning to make animation start earlier and progress smoothly
    const svgRect = svg.getBoundingClientRect();
    const startStr = "top 80%"; // يبدأ مبكراً عندما يصل top الخاص بـ SVG إلى 80% من الڤيوبورت
    const desiredScroll = Math.max(
      svgRect.height + window.innerHeight * 0.6,
      window.innerHeight * 1.2
    );
    const endStr = "+=" + Math.round(desiredScroll);
    const scrubSmooth = 0.45; // قيمة التنعيم (0.45 يعطي إحساس سلس)

    // Main ScrollTrigger (onUpdate uses gsap.to smoothing)
    ScrollTrigger.create({
      trigger: svg,
      start: startStr,
      end: endStr,
      scrub: scrubSmooth,
      onUpdate(self) {
        const p = self.progress;

        // target offset and tween it for smoothing
        const targetOffset = length * (1 - p);
        gsap.to(animPath, {
          strokeDashoffset: targetOffset,
          duration: 0.28,
          ease: "power1.out",
          overwrite: true,
        });

        // move marker smoothly to point at progress
        const point = animPath.getPointAtLength(
          Math.max(0, Math.min(length, p * length))
        );
        gsap.to("#marker", {
          attr: { cx: point.x, cy: point.y },
          duration: 0.28,
          ease: "power2.out",
          overwrite: true,
        });

        // activate steps when passed
        stepEls.forEach((el, i) => {
          if (p + 0.01 >= fractions[i]) el.classList.add("active");
          else el.classList.remove("active");
        });
      },
    });

    // set initial marker pos at start of path
    const start = animPath.getPointAtLength(0);
    const marker = document.getElementById("marker");
    marker.setAttribute("cx", start.x);
    marker.setAttribute("cy", start.y);
  }

  // debounce resize & init
  let resizeTimer;
  window.addEventListener("load", () => {
    initAnimation();
    setTimeout(initAnimation, 120); // ensure fonts/layout settled
  });
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAnimation, 160);
  });

  // carousels
  // السلايدر الرئيسي
  $(".outer-carousel").owlCarousel({
    nav: false,
    dots: false,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1,
        stagePadding: 16,
      },
      578: {
        items: 2,
        stagePadding: 50,
      },
      992: {
        items: 3
      }
    }
  });

  // السلايدر الداخلي
  $(".inner-carousel").each(function () {
    $(this).owlCarousel({
      nav: false,
      dots: true,
      loop: false,
      margin: 1,
      rtl: dirAr,
      items: 1
    });
  });

  $(".inner-carousel").on("touchstart mousedown pointerdown", function (e) {
    e.stopPropagation();
  });

  $(".review .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    dots: true,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
      },
      578: {
        items: 2,
        stagePadding: 50,
      },
      992: {
        items: 3
      }
    }
  });

  $(".blogs .owl-carousel").owlCarousel({
    nav: false,
    dots: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1
      },
      578: {
        items: 2,
        stagePadding: 50,
      },
      992: {
        items: 3
      }
    }
  });

  // car details carousel
  // Resize and refresh page. slider-two slideBy bug remove
  var changeSlide = 4; // mobile -1, desktop + 1
  var slide = changeSlide;
  if ($(window).width() < 600) {
    var slide = changeSlide;
    slide--;
  } else if ($(window).width() > 999) {
    var slide = changeSlide;
    slide++;
  } else {
    var slide = changeSlide;
  }

  $(".one").owlCarousel({
    nav: false,
    items: 1,
    margin: 5,
    autoplay: 5000,
    rtl: dirAr,
  });
  $(".two").owlCarousel({
    nav: false,
    margin: 5,
    rtl: dirAr,
    responsive: {
      0: {
        items: changeSlide - 1,
        slideBy: changeSlide - 1,
      },
      600: {
        items: changeSlide,
        slideBy: changeSlide,
      },
      1000: {
        items: changeSlide + 1,
        slideBy: changeSlide + 1,
      },
    },
  });
  var owl = $(".one");
  owl.owlCarousel();
  owl.on("translated.owl.carousel", function (event) {
    $(".right").removeClass("nonr");
    $(".left").removeClass("nonl");
    if ($(".one .owl-next").is(".disabled")) {
      $(".slider .right").addClass("nonr");
    }
    if ($(".one .owl-prev").is(".disabled")) {
      $(".slider .left").addClass("nonl");
    }
    $(".slider-two .item").removeClass("active");
    var c = $(".slider .owl-item.active").index();
    $(".slider-two .item").eq(c).addClass("active");
    var d = Math.ceil((c + 1) / slide) - 1;
    $(".slider-two .owl-dots .owl-dot").eq(d).trigger("click");
  });
  $(".right").click(function () {
    $(".slider .owl-next").trigger("click");
  });
  $(".left").click(function () {
    $(".slider .owl-prev").trigger("click");
  });
  $(".slider-two .item").click(function () {
    var b = $(".item").index(this);
    $(".slider .owl-dots .owl-dot").eq(b).trigger("click");
    $(".slider-two .item").removeClass("active");
    $(this).addClass("active");
  });
  var owl2 = $(".two");
  owl2.owlCarousel();
  owl2.on("translated.owl.carousel", function (event) {
    $(".right-t").removeClass("nonr-t");
    $(".left-t").removeClass("nonl-t");
    if ($(".two .owl-next").is(".disabled")) {
      $(".slider-two .right-t").addClass("nonr-t");
    }
    if ($(".two .owl-prev").is(".disabled")) {
      $(".slider-two .left-t").addClass("nonl-t");
    }
  });
  $(".right-t").click(function () {
    $(".slider-two .owl-prev").trigger("click");
  });
  $(".left-t").click(function () {
    $(".slider-two .owl-next").trigger("click");
  });

  // package action
  $('.subscribe-btn').on('click', function () {
    var name = $(this).data('package');
    var price = $(this).data('price');
    var id = $(this).data('id');

    $('#packageName').val(name);
    $('#packagePrice').val(price);
    $('#packageId').val(id);

    $('#subscribeFormWrapper').removeClass('d-none')[0].scrollIntoView({ behavior: 'smooth' });
  });

  // upload file or image
  $(".file-input").change(function () {
    const fileInput = $(this).find('[type="file"]')[0];
    const label = $(this).find("[data-js-label]")[0];
    console.log($(fileInput).val());
    if (!$(fileInput).val()) return;
    var value = $(fileInput)
      .val()
      .replace(/^.*[\\\/]/, "");
    $(label).html(value);
  });

  $(".fav").click(function () {
    $(this).find("i").toggleClass("bi-heart bi-heart-fill");
  });

  // profile nav responsive
  $("#profile_nav").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });
  $(".profile-header .btn-close").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });

  // upload and preview multiple images such as dropzone
  function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];

    $('.upload__inputfile').each(function () {
      $(this).on('change', function (e) {
        imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
        var maxLength = $(this).attr('data-max_length');

        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var iterator = 0;
        filesArr.forEach(function (f, index) {

          if (!f.type.match('image.*')) {
            return;
          }

          if (imgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < imgArray.length; i++) {
              if (imgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              imgArray.push(f);

              var reader = new FileReader();
              reader.onload = function (e) {
                var html = `
                <div class="col">
                    <div class='upload__img-box'>
                        <div 
                        data-number='${$(".upload__img-close").length}' 
                        data-file='${f.name}' 
                        class='img-bg'>
                            <div class='upload__img-close'></div>
                            <img src='${e.target.result}'>
                        </div>
                    </div>
                </div>`;
                imgWrap.append(html);
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
          console.log(imgArray)
        });
      });
    });

    $(document).on('click', ".upload__img-close", function (e) {
      var inputElement = $('.upload__inputfile')[0];

      // Select the image to be deleted.
      var fileName = $(this).parent().data("file");

      // Create a DataTransfer object to save new files after deletion
      var dt = new DataTransfer();

      // Update the array with the specified file deleted
      imgArray = imgArray.filter(file => file.name !== fileName);

      // Update input[type=file] with remaining files.
      for (var i = 0; i < inputElement.files.length; i++) {
        if (inputElement.files[i].name !== fileName) {
          dt.items.add(inputElement.files[i]);
        }
      }

      // Reset files to input[type=file]
      inputElement.files = dt.files;

      // Remove item from UI
      $(this).closest('.col').remove();

      console.log("remaining files :", imgArray);
    });

  }
  ImgUpload()

  // upload profile pic 
  if ($(".profile-pic").length > 0) {
    const imgDiv = document.querySelector(".profile-pic");
    const img = document.querySelector("#photo");
    const file = document.querySelector("#file");
    const uploadBtn = document.querySelector("#uploadBtn");

    //when we choose a pic to upload

    file.addEventListener("change", function () {
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
        $('.profile-pic .save_img').css("opacity", 1);
      }
    });
  }

  // select2
  // $('select').select2();

  AOS.init({
    duration: 1000
  });


});
