import { last, transform } from "lodash";
import { iNode } from "../helper";

const homeNews = {
  init,
  initEventListenres,
};

let isDragging = false;
let startX = 0;
let currentX = 0;
let angle;
// let sliders = null;
let numItems;

let currentIndex = 0;
let lastCalculatedIndex = 0;

const $ = {};

function init() {
  // Get necessary elements
  $.sliders = iNode.qs(".rotation-slider");
  $.prevButton = iNode.qs(".home-news-control-button.Previous");
  $.nextButton = iNode.qs(".home-news-control-button.Next");
  initDOM($.sliders, $.prevButton, $.nextButton);

  $.sliders.addEventListener("mousedown", handleMouseDown);

  return $;
}

// from here

function handleMouseDown(e) {
  isDragging = true; // This is the flag to check if the mouse is being draged
  startX = e.clientX; // Get the initial position of the mouse
  currentX = e.clientX; // It initializes the variable currentX with the same value as starX

  // Add the event listeners for mousemove and mouseup events
  $.sliders.addEventListener("mousemove", handleMouseMove);

  // Remove the event listeners for mousemove and mouseup events
  $.sliders.removeEventListener("mouseup", handleMouseUp);
  $.sliders.addEventListener("mouseup", handleMouseUp);

  $.sliders.addEventListener("mouseleave", handleMouseLeave);
}

function handleMouseMove(e) {
  if (isDragging && $.sliders) {
    const diffX = e.clientX - currentX;
    currentX = e.clientX;

    if (diffX > 0) {
      console.log("diffX > 0", diffX);
      //   currentIndex = (currentIndex - 1 + numItems) % numItems;
    } else {
      console.log("0 > diffX", diffX);
      //   currentIndex = (currentIndex + 1) % numItems;
    }
  }
  updateSlider();
}

function handleMouseUp(e) {
  console.log("handleMouseUp");
  $.sliders.removeEventListener("mousemove", handleMouseMove);
}

function handleMouseLeave(e) {
  $.sliders.removeEventListener("mousemove", handleMouseMove);
}

function handleTransitionEnd(e) {
  $.sliders.style.transition = "none";
}

// until here

function initDOM(sliders, prevButton, nextButton) {
  //   console.log("sliders", sliders);
  //   console.log("prevButton", prevButton);
  //   console.log("nextButton", nextButton);
}

function initEventListenres() {
  // Set the initial index
  currentIndex = 0;
  numItems = $.sliders.children.length;

  // Function to update the slider position based on the current index
  function updateSlider() {
    const itemWidth = $.sliders.firstElementChild.clientWidth;
    angle = 360 / numItems;
    const newRotation = -currentIndex * angle;
    $.sliders.style.transition = "transform 0.4s ease-in-out";
    $.sliders.style.transform = `translateX(${newRotation}%)`;
    // console.log(currentIndex);
    if (currentIndex === 0) {
      $.prevButton.style.display = "none";
    } else {
      $.prevButton.style.display = "block";
    }
    if (currentIndex === 3) {
      $.nextButton.style.display = "none";
    } else {
      $.nextButton.style.display = "block";
    }
  }

  // Event listener for the previous button
  $.prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + numItems) % numItems;
    console.log("currentIndex", currentIndex);

    updateSlider();
  });

  //
  $.sliders.addEventListener("transitionend", function () {
    // const itemWidth = sliders.firstElementChild.clientWidth;
    // const angle = 360 / numItems;
    // const newRotation = -currentIndex * angle;
    $.sliders.style.transition = "none";
    // sliders.style.transform = `translateX(${newRotation}%)`;
  });

  // Event listener for the next button
  $.nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % numItems;
    updateSlider();
  });

  updateSlider();
}

function updateSlider() {
  const itemWidth = $.sliders.firstElementChild.clientWidth;
  angle = 360 / numItems;
  const newRotation = -currentIndex * angle;
  $.sliders.style.transition = "transform 0.4s ease-in-out";
  $.sliders.style.transform = `translateX(${newRotation}%)`;
  // console.log(currentIndex);
  if (currentIndex === 0) {
    $.prevButton.style.display = "none";
  } else {
    $.prevButton.style.display = "block";
  }
  if (currentIndex === 3) {
    $.nextButton.style.display = "none";
  } else {
    $.nextButton.style.display = "block";
  }
}

export { homeNews };
