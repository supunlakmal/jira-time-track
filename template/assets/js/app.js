var trustSlider = new Swiper(".trustSlider", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".trust-pagination.swiper-pagination",
    clickable: true,
  },
  // centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
    },
  },
});

// Accordion
// Get all the accordion headers and bodies
const headers = document.querySelectorAll(".accordion-header");
const bodies = document.querySelectorAll(".accordion-body");

// Add click event listeners to the headers
headers.forEach((header) => {
  header.addEventListener("click", () => {
    // Toggle the visibility of the accordion body
    header.nextElementSibling.classList.toggle("hidden");

    // Toggle the transform of the accordion icon
    const icon = header.querySelector(".accordion-icon");
    icon.classList.toggle("rotate-0");
    icon.classList.toggle("rotate-180");
  });
});

const menuBtn = document.querySelector(".m-menu-btn");
const menu = document.querySelector(".m-menu");
const xmark = document.querySelector(".xmark");
const bars = document.querySelector(".bars");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("-left-[100%]");
  menu.classList.toggle("left-0");

  xmark.classList.toggle("hidden");
  xmark.classList.toggle("block");
  bars.classList.toggle("hidden");
  bars.classList.toggle("block");
  overlay.classList.toggle("w-0");
  overlay.classList.toggle("w-full");
});
