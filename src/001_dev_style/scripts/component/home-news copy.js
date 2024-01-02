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

document.addEventListener("mousemove", handleMouseMove);

function handleMouseDown(e) {
  isDragging = true; // This is the flag to check if the mouse is being draged
  startX = e.clientX; // Get the initial position of the mouse
  currentX = e.clientX; // It initializes the variable currentX with the same value as starX

  // Add the event listeners for mousemove and mouseup events
  document.removeEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousemove", handleMouseMove);

  // Remove the event listeners for mousemove and mouseup events
  document.removeEventListener("mouseup", handleMouseUp);
  document.addEventListener("mouseup", handleMouseUp);
  //   console.log("currentIndex", currentIndex);
  //   console.log("angle", angle);
}

function handleMouseMove(e) {
  if (isDragging && $.sliders) {
    const diffX = e.clientX - currentX;
    currentX = e.clientX;

    if ($.sliders.clientWidth !== 0) {
      //   console.log("$.sliders.style.transform", $.sliders.style.transform);
      const transformValue = $.sliders.style.transform.match(
        /translateX\(([-\d.]+)%\)/
      );
      if (transformValue && transformValue.length === 2) {
        const currentTransform = parseFloat(transformValue[1]);
        currentIndex = Math.round(-currentTransform / angle) % numItems;
        const newRotation =
          currentTransform -
          currentIndex * angle +    
          (diffX / $.sliders.clientWidth) * 360;

        currentIndex = Math.round(-newRotation / angle) % numItems;

        lastCalculatedIndex = currentIndex;

        // console.log("angle", angle);
        console.log("currentIndex", currentIndex);
        console.log("lastCalculatedIndex", lastCalculatedIndex);
        // console.log(currentTransform);
        // console.log("newRotation", newRotation);
        $.sliders.style.transition = "transform 0s";
        $.sliders.style.transform = `translateX(${newRotation}%)`;
        // console.log("$.sliders.style.transform", $.sliders.style.transform);
      }
    }
  }
}

function handleMouseUp() {
  if (isDragging && $.sliders) {
    isDragging = false;

    $.sliders.style.transition = "transform 0.4s ease-in-out";
    const matches = $.sliders.style.transform.match(/translateX\(([-\d.]+)%\)/);
    console.log("matches", matches);
    if (matches && matches.length === 2) {
      let currentTransform = parseFloat(matches[1]);
      console.log("currentTransform", currentTransform);

      $.sliders.removeEventListener("transitionend", handleTransitionEnd);

      if (currentTransform > 0) {
        currentIndex = (lastCalculatedIndex + 1) % numItems;
      } else if (currentTransform < 0) {
        currentIndex = (lastCalculatedIndex - 1 + numItems) % numItems;
      }

      lastCalculatedIndex = currentIndex;

      $.sliders.addEventListener("transitionend", handleTransitionEnd);

      console.log("currentIndex", currentIndex);
    }

    updateSlider();
  }

  // Remove the event listeners when the mouse is released
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleTransitionEnd() {
  $.sliders.style.transition = "none";
  //   $.sliders.style.transform = `translateX(${-currentIndex * angle}%)`;
  //   $.sliders.removeEventListener("transitionend", handleTransitionEnd);
}

document.addEventListener("mouseleave", (e) => {
  if (isDragging && $.sliders) {
    isDragging = false;

    $.sliders.style.transition = "transform 0.4s ease-in-out";
    currentIndex = Math.round(-$.sliders.style.transform / angle) % numItems;
    updateSlider();
  }
});

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
