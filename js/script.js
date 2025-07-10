
$(document).ready(function () {

  // loading
  $("body").css('overflow-y', 'auto');
  $('#loading').fadeOut(500);

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

  // side sticky funcution
  // function stickySidebar(mainBlk, sidebarWrapper, sidebarBlk) {
  //   var main = $(mainBlk); 
  //   var stickyWrapper = $(sidebarWrapper); 
  //   var stickyBlk = $(sidebarBlk); 
  //   var startPos = stickyBlk.offset().top; 
  //   var finishPos = main.offset().top + main.outerHeight() - stickyBlk.outerHeight();

  //   stickyWrapper.height(main.height());

  //   $(window).scroll(function () {
  //     var currentScrollPos = $(document).scrollTop();

  //     var test;

  //     if ((currentScrollPos > startPos) && (currentScrollPos <= finishPos)) {
  //       test = currentScrollPos + startPos;
  //       stickyBlk.addClass('bottom');
  //       stickyBlk.css('top', test);
  //     } else if (currentScrollPos <= startPos) {
  //       stickyBlk.removeClass('bottom');
  //       stickyBlk.css('top', 0);
  //     } else if (currentScrollPos > finishPos) {
  //       stickyBlk.addClass('bottom');
  //       stickyBlk.css('top', '100%');
  //     } else {
  //       stickyBlk.css('top', 100);
  //     }
  //   });
  // } 
  // if ($(window).width() >= 992 && $('.car-single').length > 0) {
  //   $(window).on('load', function () {
  //     stickySidebar('.stick-next-to', '.sticky-wrapper', '.sticky');
  //   });
  // }


  // home carousels
  $(".car_offers .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });
  $(".car_brand .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 2
      },
      578: {
        items: 3
      },
      768: {
        items: 4
      },
      992: {
        items: 6
      }
    }
  });
  $(".related_car .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 1
      },
      578: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 3
      }
    }
  });
  $(".partners .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });
  $(".ads-section .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  });
  $(".pricing .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    responsiveClass: true,
    margin: 16,
    rtl: true,
    responsive: {
      0: {
        items: 1,
        dots: true
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
        mouseDrag: false,
        touchDrag: false

      }
    }
  });

  // car details carousel
  var changeSlide = 4; // mobile -1, desktop + 1
  // Resize and refresh page. slider-two slideBy bug remove
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
  // Make num >=9 have 0 before 01 02 ....
  function NumOf(n) {
    return (n < 10 && n != 0) ? '0' + n : '' + n;
  }
  $('.one').on('initialized.owl.carousel changed.owl.carousel', function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
    $('.slider-counter .len').html(`${NumOf(carousel.items().length)}`)
    $('.slider-counter .current').html(`${NumOf(carousel.relative(carousel.current()) + 1)}`)
  }).owlCarousel({
    nav: true,
    navText: [`<i class="fa-solid fa-chevron-right"></i>`, `<i class="fa-solid fa-chevron-left"></i>`],
    items: 1,
    margin: 3,
    autoplay: 5000,
    autoplayHoverPause: true,
    rtl: true
  })
  $('.two').owlCarousel({
    nav: false,
    margin: 4,
    rtl: true,
    responsive: {
      0: {
        items: changeSlide - 1,
        slideBy: changeSlide - 1
      },
      600: {
        items: changeSlide,
        slideBy: changeSlide
      },
      1000: {
        items: changeSlide + 1,
        slideBy: changeSlide + 1
      }
    }
  })
  var owl = $('.one');
  owl.owlCarousel();
  owl.on('translated.owl.carousel', function (event) {
    $('.slider-two .item').removeClass("active");
    var c = $(".slider .owl-item.active").index();
    $('.slider-two .item').eq(c).addClass("active");
    var d = Math.ceil((c + 1) / (slide)) - 1;
    $(".slider-two .owl-dots .owl-dot").eq(d).trigger('click');
  })
  $('.slider-two .item').click(function () {
    var stickyOffset = $(".item").index(this);
    $(".slider .owl-dots .owl-dot").eq(stickyOffset).trigger('click');
    $(".slider-two .item").removeClass("active");
    $(this).addClass("active");
  });


  $('.subscribe-btn').on('click', function () {
    var name = $(this).data('package');
    var price = $(this).data('price');
    var id = $(this).data('id');

    $('#packageName').val(name);
    $('#packagePrice').val(price);
    $('#packageId').val(id);

    $('#subscribeFormWrapper').removeClass('d-none')[0].scrollIntoView({ behavior: 'smooth' });
  });

  // apply job upload cv
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

  /* -------------- upload profile pic ---------------- */
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

  $('select').select2();


});
