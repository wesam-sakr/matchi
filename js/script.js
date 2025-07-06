
$(document).ready(function () {

  // loading
  $("body").css('overflow-y', 'auto');
  $('#loading').fadeOut(500);

  // show & hide password
  if ($('.pass').length > 0) {
    $('.pass').click(function () {
      $(this).toggleClass("bi-eye-slash bi-eye");
      var pass = $(this).closest('.input-group').find('input');
      if (pass.attr("type") == "password") {
        pass.attr("type", "text");
      } else {
        pass.attr("type", "password");
      }
    });
  }

  
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
        items: 3 ,
        mouseDrag: false,
        touchDrag: false

      }
    }
  });

  $('.filter select').select2();
  
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


  // === start filter page === //
  $("#filter").click(function () {
    console.log('filteeeeer')
    $(".filter").toggleClass("filter-toggle");
  });
  $(".filter-header .btn-close").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });
  if ($('.car_filter').length > 0) {
    // Add event listeners to filter options
    const selectedFiltersList = document.getElementById('selected-filters-list');
    const filterInputs = document.querySelectorAll('.car_filter .form-check-input');
    const clearAllBtn = document.getElementById('clear-all-filters');
    if (filterInputs.length > 0) {
      filterInputs.forEach(input => {
        input.addEventListener('change', function () {
          const label = this.nextElementSibling.textContent.trim();
          if (this.checked) {
            // Add selected filter if it's not already added
            let existingFilter = selectedFiltersList.querySelector(`[data-filter="${this.id}"]`);
            if (!existingFilter) {
              const li = document.createElement('li');
              li.textContent = label;
              li.setAttribute('data-filter', this.id);

              // For radio buttons, associate the filter with the radio group
              if (this.type === 'radio') {
                const groupName = this.name;
                const previousSelection = selectedFiltersList.querySelector(`[data-group="${groupName}"]`);
                if (previousSelection) {
                  selectedFiltersList.removeChild(previousSelection);
                }
                li.setAttribute('data-group', this.name);
              }

              const removeBtn = document.createElement('button');
              removeBtn.className = 'remove-filter-btn';
              removeBtn.innerHTML = '<i class="fas fa-times"></i>'; // Using Font Awesome icon
              removeBtn.onclick = function () {
                document.getElementById(li.getAttribute('data-filter')).checked = false;
                selectedFiltersList.removeChild(li);
              };

              li.appendChild(removeBtn);
              selectedFiltersList.appendChild(li);
            }
          } else {
            // Remove unselected filter
            const itemToRemove = selectedFiltersList.querySelector(`[data-filter="${this.id}"]`);
            if (itemToRemove) {
              selectedFiltersList.removeChild(itemToRemove);
            }
          }

          if (selectedFiltersList.children.length > 0) {
            selectedFiltersList.style.display = 'flex'
          }
          else {
            console.log('empty')
            selectedFiltersList.style.display = 'none'
          }
        });
      });

      // Function to clear all filters
      clearAllBtn.addEventListener('click', function () {
        selectedFiltersList.style.display = 'none'
        // Uncheck all inputs
        filterInputs.forEach(input => input.checked = false);

        // Remove all selected filters from the list
        while (selectedFiltersList.firstChild) {
          selectedFiltersList.removeChild(selectedFiltersList.firstChild);
        }
      });
    }
    if (selectedFiltersList.children.length > 0) {
      selectedFiltersList.style.display = 'flex'
    }
    else {
      console.log('empty')
      selectedFiltersList.style.display = 'none'
    }
    // price from .. to ..
    var inputLeft = document.getElementById("input-left");
    var inputRight = document.getElementById("input-right");
    var thumbLeft = document.querySelector(".slider > .thumb.left");
    var thumbRight = document.querySelector(".slider > .thumb.right");
    var range = document.querySelector(".slider > .range");
    var priceFrom = document.querySelector(".price-from");
    var priceTo = document.querySelector(".price-to");
    if (inputLeft !== null) {
      function setLeftValue() {
        var _this = inputLeft,
          min = parseInt(_this.min),
          max = parseInt(_this.max);

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

        var percent = ((_this.value - min) / (max - min)) * 100;

        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";

        // Calculate price based on range value
        var price = parseInt(inputLeft.value) * 3; // Adjust this formula based on your requirements
        priceFrom.textContent = price + " ج.م";
      }
      setLeftValue();

      function setRightValue() {
        var _this = inputRight,
          min = parseInt(_this.min),
          max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

        var percent = ((_this.value - min) / (max - min)) * 100;

        thumbRight.style.right = (100 - percent) + "%";
        range.style.right = (100 - percent) + "%";

        // Calculate price based on range value
        var price = parseInt(inputRight.value) * 3; // Adjust this formula based on your requirements
        priceTo.textContent = price + "  ج.م";
      }
      setRightValue();

      inputLeft.addEventListener("input", setLeftValue);
      inputRight.addEventListener("input", setRightValue);

      // Add event listeners for thumb hover and active states
      // These listeners are not directly related to updating the price
      inputLeft.addEventListener("mouseover", function () {
        thumbLeft.classList.add("hover");
      });
      inputLeft.addEventListener("mouseout", function () {
        thumbLeft.classList.remove("hover");
      });
      inputLeft.addEventListener("mousedown", function () {
        thumbLeft.classList.add("active");
      });
      inputLeft.addEventListener("mouseup", function () {
        thumbLeft.classList.remove("active");
      });

      inputRight.addEventListener("mouseover", function () {
        thumbRight.classList.add("hover");
      });
      inputRight.addEventListener("mouseout", function () {
        thumbRight.classList.remove("hover");
      });
      inputRight.addEventListener("mousedown", function () {
        thumbRight.classList.add("active");
      });
      inputRight.addEventListener("mouseup", function () {
        thumbRight.classList.remove("active");
      });
    }
  }
  // === end filter page === //

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

  
});
