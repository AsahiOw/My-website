
// sticky effect for header
window.onscroll = function() {stickyEffect()};
var header = document.getElementById("stickyHeader");
var sticky = header.offsetTop;
function stickyEffect() 
{
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//swipe photo function
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
      el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  });