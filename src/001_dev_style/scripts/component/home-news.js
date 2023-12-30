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
  initDOM(sliders, prevButton, nextButton);
  return { sliders, prevButton, nextButton };
}

function initDOM(sliders, prevButton, nextButton) {
  console.log("sliders", sliders);
  //   console.log("prevButton", prevButton);
  //   console.log("nextButton", nextButton);
}

function initEventListenres(sliders, prevButton, nextButton) {
  // document.addEventListener("DOMContentLoaded", function () {
  // Set the initial index
  let currentIndex = 0;
  // Function to update the slider position based on the current index
  function updateSlider() {
    const itemWidth = sliders.firstElementChild.clientWidth;
    console.log("sliders.firstElementChild", sliders.firstElementChild);
    // console.log("itemWidth", itemWidth);
    console.log("currentIndex", currentIndex);
    const newPosition = -currentIndex * itemWidth;
    sliders.style.transform = `translateX(${newPosition}px)`;
    console.log(sliders.style.transform);
  }

  // Event listener for the previous button
  prevButton.addEventListener("click", function () {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
  });

  // Event listener for the next button
  nextButton.addEventListener("click", function () {
    const numItems = sliders.children.length;
    currentIndex = Math.min(currentIndex + 1, numItems - 1);
    updateSlider();
  });
}

export { homeNews };
