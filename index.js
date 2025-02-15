
// Navbar
const navContainer = document.getElementById("nav-container");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navContainer.innerHTML = `
      <div class="middle-item">
          <p class="middle-anywhere">Anywhere</p>
          <p class="middle-Any-week">Any week</p>
          <p class="middle-Add-guests">Add guests</p>
          <i class="fa-solid fa-magnifying-glass" id="search-icons"></i>
      </div>
  `;
  } else {
    navContainer.innerHTML = `
      <nav class="nav-links">
          <a href="#" class="active">Homes</a>
          <a href="#">Experiences</a>
      </nav>
  `;
  }
});


// category
const filterbar = document.querySelector(".filter-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    filterbar.classList.add("sticky-filter");
  } else {
    filterbar.classList.remove("sticky-filter");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const hotelCards = document.querySelectorAll(".hotel-card");

  hotelCards.forEach((card) => {
    let images = card.querySelectorAll(".slider img");
    let currentIndex = 0;
    let prevButton = card.querySelector(".prev");
    let nextButton = card.querySelector(".next");

    nextButton.addEventListener("click", function () {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    });

    prevButton.addEventListener("click", function () {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      images[currentIndex].classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categoryContainer = document.querySelector(".categories");
  const scrollLeft = document.querySelector(".scroll-left");
  const scrollRight = document.querySelector(".scroll-right");

  // Scroll left
  scrollLeft.addEventListener("click", () => {
    categoryContainer.scrollBy({ left: -150, behavior: "smooth" });
  });

  // Scroll right
  scrollRight.addEventListener("click", () => {
    categoryContainer.scrollBy({ left: 150, behavior: "smooth" });
  });

  // Active class toggle
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", () => {
      document
        .querySelectorAll(".category")
        .forEach((item) => item.classList.remove("active"));
      category.classList.add("active");
    });
  });
});
