import { iNode } from "../helper";

let isDragging = false;
let startX = 0;
let currentX = 0;
let angle;
// let sliders = null;
let numItems;

let currentIndex = 0;
let debounceTimer;

class HomeNews {
  constructor() {
    this.sliders = iNode.qs(".rotation-slider");
    this.prevButton = iNode.qs(".home-news-control-button.Previous");
    this.nextButton = iNode.qs(".home-news-control-button.Next");

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.initDOM(this.sliders, this.prevButton, this.nextButton);
  }

  start() {
    this.init();
    this.initEventListenres();
  }

  init() {
    this.sliders.addEventListener("mousedown", this.handleMouseDown);
  }

  handleMouseDown(e) {
    console.log("this.sliders", this.sliders);
    console.log("this.prevButton", this.prevButton);
    console.log("this.nextButton", this.nextButton);
    isDragging = true; // This is the flag to check if the mouse is being draged
    startX = e.clientX; // Get the initial position of the mouse
    currentX = e.clientX; // It initializes the variable currentX with the same value as starX

    // Add the event listeners for mousemove and mouseup events
    this.sliders.addEventListener("mousemove", this.handleMouseMove);

    // Remove the event listeners for mousemove and mouseup events
    this.sliders.removeEventListener("mouseup", this.handleMouseUp);
    this.sliders.addEventListener("mouseup", this.handleMouseUp);

    this.sliders.addEventListener("mouseleave", this.handleMouseLeave);
  }

  handleMouseMove(e) {
    if (isDragging && this.sliders) {
      const debounceDelay = 100;
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const diffX = e.clientX - currentX;
        currentX = e.clientX;

        if (diffX > 0 && currentIndex > 0) {
          currentIndex = (currentIndex - 1 + numItems) % numItems;
        } else if (diffX < 0 && currentIndex < numItems - 1) {
          // console.log("0 > diffX", diffX);
          currentIndex = (currentIndex + 1) % numItems;
        }

        this.updateSlider(currentIndex);
      }, debounceDelay);
    }
  }

  handleMouseUp(e) {
    // console.log("handleMouseUp");
    this.sliders.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseLeave(e) {
    this.sliders.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleTransitionEnd(e) {
    this.sliders.style.transition = "none";
  }

  // until here

  initDOM(sliders, prevButton, nextButton) {
    // console.log("sliders", sliders);
    // console.log("prevButton", prevButton);
    // console.log("nextButton", nextButton);
  }

  initEventListenres() {
    // Set the initial index
    currentIndex = 0;
    numItems = this.sliders.children.length;

    // Function to update the slider position based on the current index
    this.updateSlider = () => {
      const itemWidth = this.sliders.firstElementChild.clientWidth;
      angle = 360 / numItems;
      const newRotation = -currentIndex * angle;
      this.sliders.style.transition = "transform 0.4s ease-in-out";
      this.sliders.style.transform = `translateX(${newRotation}%)`;
      // console.log(currentIndex);
      if (currentIndex === 0) {
        this.prevButton.style.display = "none";
      } else {
        this.prevButton.style.display = "block";
      }
      if (currentIndex === 3) {
        this.nextButton.style.display = "none";
      } else {
        this.nextButton.style.display = "block";
      }
    };

    // Event listener for the previous button
    this.prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + numItems) % numItems;
      // console.log("currentIndex", currentIndex);

      this.updateSlider();
    });

    //
    this.sliders.addEventListener("transitionend", () => {
      // const itemWidth = sliders.firstElementChild.clientWidth;
      // const angle = 360 / numItems;
      // const newRotation = -currentIndex * angle;
      this.sliders.style.transition = "none";
      // sliders.style.transform = `translateX(${newRotation}%)`;
    });

    // Event listener for the next button
    this.nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % numItems;
      this.updateSlider();
    });

    this.updateSlider();
  }

  updateSlider() {
    const itemWidth = this.sliders.firstElementChild.clientWidth;
    angle = 360 / numItems;
    const newRotation = -currentIndex * angle;
    this.sliders.style.transition = "transform 0.4s ease-in-out";
    this.sliders.style.transform = `translateX(${newRotation}%)`;
    // console.log(currentIndex);
    if (currentIndex === 0) {
      this.prevButton.style.display = "none";
    } else {
      this.prevButton.style.display = "block";
    }
    if (currentIndex === 3) {
      this.nextButton.style.display = "none";
    } else {
      this.nextButton.style.display = "block";
    }
  }
}

export default HomeNews;
