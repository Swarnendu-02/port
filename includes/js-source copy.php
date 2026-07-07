<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" integrity="sha512-P2IDYZfqSwjcSjX0BKeNhwRUH8zRPGlgcWl5n6gBLzdi4Y5/0O4zaXrtO4K9TZK6Hn1BenYpKowuCavNandERg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="js/main.js"></script>

<script src="js/jquery.min.js"></script>
<script src="js/owl.carousel.js"></script>
<script src='https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.4/imagesloaded.pkgd.js'></script>
<script src="https://cdn.jsdelivr.net/npm/parvus@2.3.3/dist/js/parvus.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" integrity="sha512-Eak/29OTpb36LLo2r47IpVzPBLXnAMPAVypbSZiZ4Qkf8p/7S/XRG5xp7OKWPPYfJT6metI+IORkR5G8F900+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    
    var counted = 0;
    $(window).scroll(function() {

        var oTop = $('#counter').offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            $('.count').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },

                    {

                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            counted = 1;
        }

    });
    new WOW().init();
    $('.service-btn').click(function() {
        if ($(this).hasClass("active")) {
            $(".service_box").slideUp();
            $(".service-btn").removeClass("active");
        } else {
            $(".service_box").slideUp();
            $(".service-btn").removeClass("active");
            $(this).parent().find('.service_box').slideDown();
            $(this).addClass("active");
        }
    });
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $('header').addClass('fixed-header');
        } else {
            $('header').removeClass('fixed-header');
        }

    });
    $(function() {
        $('.about_toggle_btn a').click(function() {
            var tabId = $(this).attr('data-tab');
            $('.about_toggle_btn a').removeClass('active');
            $('.about_container').removeClass('active').slideUp();
            $(this).addClass('active');
            $('#' + tabId).addClass('active').slideDown();
        });

        $('.has_sub').click(function() {
            var tabId = $(this).attr('data-tab');
            if ($(this).hasClass("active")) {
                $(".sub_menu").hide();
                $(".has_sub").removeClass("active");
                $(".sub_menu_inner_rt_inner").hide().removeClass("open");
                $(".has_sub_inner").removeClass("active");
            } else {
                $(".sub_menu").hide();
                $(".has_sub").removeClass("active");
                $(".sub_menu_inner_rt_inner").hide().removeClass("open");
                $(".has_sub_inner").removeClass("active");
                $('#' + tabId).toggle().toggleClass("open");
                $(this).toggleClass("active");
                $(".sub_menu_inner_rt .sub_menu_inner_rt_inner:first-child").show();
                $(".sub_menu_inner_lt .has_sub_inner:first-child").addClass("active");
            }
        });
        $(".sub_close").click(function() {
            $(".sub_menu").removeClass("open");
            $(".has_sub").removeClass("active");
        });
        // $('.main_menu li a').click(function() {
        //     $(".sub_menu").hide();
        //     $(".has_sub").removeClass("active");
        //     $(".sub_menu_inner_rt_inner").hide();
        //     $(".has_sub_inner").removeClass("active");
        //     $(".sub_menu_inner_rt .sub_menu_inner_rt_inner:first-child").show();
        //     $(".sub_menu_inner_lt .has_sub_inner:first-child").addClass("active");
        // });

        $('.has_sub_inner').hover(function() {
            var tabId = $(this).attr('data-tab');
            $(".sub_menu_inner_rt_inner").hide();
            $(".has_sub_inner").removeClass("active");
            $('#' + tabId).show();
            $(this).toggleClass("active");
        });

        $(".page_inner_link_click[href^='#']").click(function(e) {
            e.preventDefault();
            $(".page_inner_link_click").removeClass("active");
            $(this).addClass("active");
            var position = $($(this).attr("href")).offset().top - 100;

            $("body, html").animate({
                scrollTop: position
            }, 'slow');
        });
    });
    $(document).ready(function() {
        if (screen.width < 960) {
            $('.has_sub_inner').click(function() {
                var tabId = $(this).attr('data-tab');
                $(".sub_menu_inner_rt_inner").removeClass("open");
                $(".has_sub_inner").removeClass("active");
                $('#' + tabId).addClass("open");
                $(this).addClass("active");
                $('.sub_menu_inner_rt').addClass('open');
            });

        }
        $('.faq ul li button').click(function() {
            if ($(this).hasClass("active")) {
                $(".faq ul li p").slideUp();
                $(".faq ul li button").removeClass("active");
            } else {
                $(".faq ul li p").slideUp();
                $(".faq ul li button").removeClass("active");
                $(this).parent().find("p").slideToggle();
                $(this).parent().find("button").toggleClass("active");
            }
        });
        // $('.menu_sub_click').click(function() {
        //     $(".sub_menu_ul").slideUp();
        //     $(".menu_click").removeClass("active");
        // });
    });
    $(".sub_sub_close").click(function() {
        $('.sub_menu_inner_rt').removeClass('open');
        $(".sub_menu_inner_rt_inner").removeClass("open");
        $(".has_sub_inner").removeClass("active");
    });


    function gotoTop(top) {
        $("html, body").animate({
            scrollTop: top + "px"
        }, 'slow');

    };
    $(".click-to-toggle").click(function() {
        $(".fixed-action-btn ul").toggle();
    });
    $(".main-btn-bk").click(function() {
        $(".main_menu").addClass("open");
        $("html, body").addClass("overflow-hidden");
    });
    $(".main_close").click(function() {
        $(".main_menu").removeClass("open");
        $("html, body").removeClass("overflow-hidden");
    });
    $(".nav-link-menu").click(function() {
        $(".main-menu").removeClass("menu-open");
        $("html, body").removeClass("overflow-hidden");
        $(".sub-menu").hide();
    });

    // Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id]");

    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {

        // Get current scroll position
        let scrollY = window.pageYOffset;

        // Now we loop through sections to get height, top and ID values for each
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 400;
            sectionId = current.getAttribute("id");

            /*
            - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
            */
            if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {
                document.querySelector(".main-menu a[href*=" + sectionId + " ]").classList.add("active");
            } else {
                document.querySelector(".main-menu a[href*=" + sectionId + " ]").classList.remove("active");
            }
        });
    }
</script>
<script>
    $('.regi_owl').owlCarousel({
        loop: false,
        margin: 20,
        autoWidth: true,
        items: 2,
        dots: false,
        dotsData: false,
        nav: true,
        navText: [
            '<i class="fal fa-angle-left"></i>',
            '<i class="fal fa-angle-right"></i>'
        ],
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        autoplaySpeed: 5000,
        // animateOut: 'fadeOut',
        speed: 8000,

    });

    $('.banner_owl').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        dotsData: false,
        nav: false,

        mouseDrag: false,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        animateOut: 'fadeOut',
        // speed: 80,

    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-nav',
        infinite: false,
        autoplay: false,
        autoplaySpeed: 8000,
        arrows: false,
        dots: false,
        fade: true,
        speed: 100,

    });
    $('.slider-nav').slick({
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        infinite: false,
        focusOnSelect: false,
        slidesPerRow: 1,
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 7000,
        arrows: false,
        dots: true,
        fade: true,
        speed: 100,
        accessibility: true,
        onAfterChange: function(slide, index) {
            console.log("slider-nav change");
            console.log(this.$slides.get(index));
            $('.current-slide').removeClass('current-slide');
            $(this.$slides.get(index)).addClass('current-slide');
        },
        onInit: function(slick) {
            $(slick.$slides.get(0)).addClass('current-slide');
        },
        customPaging: function(slick, index) {
            return '<a>' + (index + 1) + '</a>';
        }
    });
</script>