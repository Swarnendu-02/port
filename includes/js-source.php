<script src="js/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"
  integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"
  integrity="sha512-P2IDYZfqSwjcSjX0BKeNhwRUH8zRPGlgcWl5n6gBLzdi4Y5/0O4zaXrtO4K9TZK6Hn1BenYpKowuCavNandERg=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollSmoother.min.js"
  integrity="sha512-t4hwZimhnCKT3YLAsEcAcRDkngVFfCcUIfNLIjklrIZAZKD+GfQMP7HbRcsVHxNS48WRBSywNU1uSM2zzLQt1Q=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"
  integrity="sha512-wOeEC+9qERAzhliwBFPDb6t8TiFFxdxG8vhK/Ygs7TuC44bpg8pg/X2/U/u+0X4fK05wb9id1EIipnF02+CFQw=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollToPlugin.min.js"
  integrity="sha512-kz526itdNcpyMs18TLPOhsnIeOIO1JywWKbbF77zR+ZKpZ4gwubXhwaURHpt5Se9AAqSK2j8ID0LnfXsB2Jkjg=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/CustomEase.min.js"
  integrity="sha512-CuvnoNrIlhT8htAhjvvnA7EB4sUHfRvfFsjq+JvAKPotN8LlelK/lQgX+u9Gxxsl0+lXmEWRMLPv/oKT1W3dPw=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/MotionPathPlugin.min.js"
  integrity="sha512-vuNgw6lF+p97XmL9lFpbQZWBXxIFnwUVt7J/uknE4NJru5GJjjhIAauXdDtNdezqOJFnit+M3AeaM+gZ93hlmg=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>


<script src="js/main.js"></script>
<script src="js.js"></script>

<script src="js/owl.carousel.js"></script>
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'>
<script src='https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.4/imagesloaded.pkgd.js'></script>
<script src="https://cdn.jsdelivr.net/npm/parvus@2.3.3/dist/js/parvus.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
  integrity="sha512-Eak/29OTpb36LLo2r47IpVzPBLXnAMPAVypbSZiZ4Qkf8p/7S/XRG5xp7OKWPPYfJT6metI+IORkR5G8F900+g=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js'></script>
<script>
  const texts = [
    "UI/UX DESIGN",
    "WEBSITE DESIGNING",
    "WEBSITE DEVELOPMENT",
    "HOSTING & SEO"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1400;

  function typeLoop() {
    const current = texts[textIndex];
    const displayed = current.substring(0, charIndex);

    document.getElementById("type-text").textContent = displayed;

    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeLoop, typingSpeed + Math.random() * 40); // natural typing
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeLoop, deletingSpeed);
    } else {
      isDeleting = !isDeleting;

      if (!isDeleting) {
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(typeLoop, pauseTime);
    }
  }

  typeLoop();

  $('.count').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
</script>