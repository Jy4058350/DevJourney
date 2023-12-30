import { iNode } from "../helper";

// console.log("home-news.js");

const homeNews = {
  init,
  initEventListenres,
};

function init() {
  // Get necessary elements
  const sliders = iNode.qs(".rotation-slider");
  const prevButton = iNode.qs(".home-news-control-button.Previous");
  const nextButton = iNode.qs(".home-news-control-button.Next");
  return { sliders, prevButton, nextButton };
  //   initDOM(slider, prevButton, nextButton);
  //   initEventListenres(slider, prevButton, nextButton);
}

function initDOM(slider, prevButton, nextButton) {
  //   console.log("slider", slider);
  //   console.log("prevButton", prevButton);
  //   console.log("nextButton", nextButton);
}

function initEventListenres(slider, prevButton, nextButton) {
  console.log("initEventListenres");
  // document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  // Set the initial index
  let currentIndex = 0;
  // Function to update the slider position based on the current index
  function updateSlider() {
    const itemWidth = slider.firstElementChild.clientWidth;
    console.log("itemWidth", itemWidth);
    const newPosition = -currentIndex * itemWidth;
    slider.style.transform = `translateX(${newPosition}px)`;
  }

  // Event listener for the previous button
  prevButton.addEventListener("click", function () {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
  });

  // Event listener for the next button
  nextButton.addEventListener("click", function () {
    const numItems = slider.children.length;
    currentIndex = Math.min(currentIndex + 1, numItems - 1);
    updateSlider();
  });
}

export { homeNews };
