// Navbar
const navContainer = document.getElementById("nav-container");
window.addEventListener("scroll", () => {
  if (window.scrollY > 5) {
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

window.addEventListener("scroll", () => {
  const containersearch = document.querySelector(".containersearch");

  if (window.scrollY > 5) {
    containersearch.classList.add("hide-search");
  } else {
    containersearch.classList.remove("hide-search");
  }
});

// category
const filterbar = document.querySelector(".filter-bar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 5) {
    filterbar.classList.add("sticky-filter");
  } else {
    filterbar.classList.remove("sticky-filter");
  }
});

// arrow left and right
document.addEventListener("DOMContentLoaded", function () {
  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");
  const categories = document.querySelector(".categories");

  scrollLeftBtn.addEventListener("click", function () {
    categories.scrollBy({ left: -200, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", function () {
    categories.scrollBy({ left: 200, behavior: "smooth" });
  });
});


// map show start
document.querySelector('.show-button').addEventListener('click', function() {
  const hotelGrid = document.querySelector('.container .hotel-grid');
  const mapView = document.getElementById('map-view');
  const button = this.querySelector('button');
  const icon = this.querySelector('i');

  if (mapView.style.display === 'none' || mapView.style.display === '') {
    hotelGrid.style.display = 'none';
    mapView.style.display = 'block';
    button.innerText = 'Show List';
    icon.classList.remove('fa-map');
    icon.classList.add('fa-list');
  } else {
    hotelGrid.style.display = 'flex';
    mapView.style.display = 'none';
    button.innerText = 'Show Map';
    icon.classList.remove('fa-list');    
    icon.classList.add('fa-map');  
  }
});
// map show end




// tab for home and experience
function switchTab(
  activeTabId,
  inactiveTabId,
  activeSectionId,
  inactiveSectionId
) {
  document.getElementById(activeSectionId).style.display = "block";
  document.getElementById(inactiveSectionId).style.display = "none";
  document.getElementById(activeTabId).classList.add("active");
  document.getElementById(inactiveTabId).classList.remove("active");
}
// Ensure initial active tab and section on page load
window.addEventListener("DOMContentLoaded", function () {
  switchTab("home-tab", "experience-tab", "home-section", "experience-section");
});
// Event listener for Home tab
document.getElementById("home-tab").addEventListener("click", function () {
  switchTab("home-tab", "experience-tab", "home-section", "experience-section");
});
// Event listener for Experience tab
document
  .getElementById("experience-tab")
  .addEventListener("click", function () {
    switchTab(
      "experience-tab",
      "home-tab",
      "experience-section",
      "home-section"
    );
  });

// range slider
document.addEventListener("DOMContentLoaded", () => {
  const COLOR_TRACK = "#CBD5E1";
  const COLOR_RANGE = "#0EA5E9";

  // Get the sliders and tooltips
  const fromSlider = document.querySelector("#fromSlider");
  const toSlider = document.querySelector("#toSlider");
  const fromTooltip = document.querySelector("#fromSliderTooltip");
  const toTooltip = document.querySelector("#toSliderTooltip");
  const scale = document.getElementById("scale");

  // Get min and max values from the fromSlider element
  const MIN = parseInt(fromSlider.getAttribute("min"));
  const MAX = parseInt(fromSlider.getAttribute("max"));
  const STEPS = parseInt(scale.dataset.steps);

  function controlFromSlider(fromSlider, toSlider, fromTooltip, toTooltip) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, COLOR_TRACK, COLOR_RANGE, toSlider);
    if (from > to) {
      fromSlider.value = to;
    }
    setTooltip(fromSlider, fromTooltip);
  }

  function controlToSlider(fromSlider, toSlider, fromTooltip, toTooltip) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, COLOR_TRACK, COLOR_RANGE, toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
    } else {
      toSlider.value = from;
    }
    setTooltip(toSlider, toTooltip);
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector("#toSlider");
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  function setTooltip(slider, tooltip) {
    const value = slider.value;
    tooltip.textContent = `$${value}`;
    const thumbPosition = (value - slider.min) / (slider.max - slider.min);
    const percent = thumbPosition * 100;
    const markerWidth = 20;
    const offset = (((percent - 50) / 50) * markerWidth) / 2;
    tooltip.style.left = `calc(${percent}% - ${offset}px)`;
  }

  function createScale(min, max, step) {
    const range = max - min;
    const steps = range / step;
    for (let i = 0; i <= steps; i++) {
      const value = min + i * step;
      const percent = ((value - min) / range) * 100;
      const marker = document.createElement("div");
      marker.style.left = `${percent}%`;
      marker.textContent = `$${value}`;
      scale.appendChild(marker);
    }
  }

  // events
  fromSlider.oninput = () =>
    controlFromSlider(fromSlider, toSlider, fromTooltip, toTooltip);
  toSlider.oninput = () =>
    controlToSlider(fromSlider, toSlider, fromTooltip, toTooltip);

  // Initial load
  fillSlider(fromSlider, toSlider, COLOR_TRACK, COLOR_RANGE, toSlider);
  setToggleAccessible(toSlider);
  setTooltip(fromSlider, fromTooltip);
  setTooltip(toSlider, toTooltip);
  createScale(MIN, MAX, STEPS);
});
// Get the range sliders and tooltips
const fromSlider = document.getElementById("fromSlider");
const toSlider = document.getElementById("toSlider");
const fromSliderTooltip = document.getElementById("fromSliderTooltip");
const toSliderTooltip = document.getElementById("toSliderTooltip");
const minPriceLabel = document.getElementById("minPrice");
const maxPriceLabel = document.getElementById("maxPrice");

// Function to update the slider values and tooltips
function updateSliderValues() {
  const fromValue = fromSlider.value;
  const toValue = toSlider.value;

  // Update tooltips
  fromSliderTooltip.textContent = fromValue;
  toSliderTooltip.textContent = toValue;

  // Update the price labels
  minPriceLabel.textContent = `₹${fromValue}`;
  maxPriceLabel.textContent = `₹${toValue}+`;
}

// Initialize the slider values on load
updateSliderValues();

// Add event listeners to update values on input
fromSlider.addEventListener("input", updateSliderValues);
toSlider.addEventListener("input", updateSliderValues);

// Set initial values on load
window.addEventListener("DOMContentLoaded", function () {
  fromSlider.dispatchEvent(new Event("input"));
  toSlider.dispatchEvent(new Event("input"));
});

// Clear filters function
function clearFilters() {
  fromSlider.value = fromSlider.min;
  toSlider.value = toSlider.max;
  fromSlider.dispatchEvent(new Event("input"));
  toSlider.dispatchEvent(new Event("input"));
}

// rooms beds js code
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".bedrooms-items").forEach(item => {
      const minusBtn = item.querySelector(".sub-items");
      const plusBtn = item.querySelector(".add-items");
      const counter = item.querySelector(".bedrooms-counter");
      let count = 0;
      minusBtn.style.visibility = "hidden";

      plusBtn.addEventListener("click", function () {
          count++;
          counter.textContent = count + "+";
          minusBtn.style.visibility = "visible";
      });

      minusBtn.addEventListener("click", function () {
          if (count > 1) {
              count--;
              counter.textContent = count + "+";
          } else {
              count = 0;
              counter.textContent = "Any";
              minusBtn.style.visibility = "hidden"; // Hide "-" button again
          }
      });
  });
});

