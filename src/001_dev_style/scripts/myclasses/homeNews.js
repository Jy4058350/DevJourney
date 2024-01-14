import { iNode } from "../helper";

let isDragging = false;
let startX = 0;
let currentX = 0;
let angle;
let debounceTimer;

class HomeNews {
  constructor() {
    this.currentIndex = 0;
    this.sliders = iNode.qs(".rotation-slider");
    this.numItems = this.sliders.children.length;
    console.log("this.numItems", this.numItems);
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
    this.currentIndex = 0;
    this.init();
    this.initEventListenres();
  }

  init() {
    // this.sliders.addEventListener("mousedown", this.handleMouseDown);
  }

  handleMouseDown(e) {
    console.log("e.target", e.target);
    console.log("e.type", e.type);
    console.log("e.timeStamp", e.timeStamp);
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

        if (diffX > 0 && this.currentIndex > 0) {
          this.currentIndex =
            (this.currentIndex - 1 + this.numItems) % this.numItems;
        } else if (diffX < 0 && this.currentIndex < this.numItems - 1) {
          // console.log("0 > diffX", diffX);
          this.currentIndex = (this.currentIndex + 1) % this.numItems;
        }

        this.updateSlider(this.currentIndex);
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
    console.log("this.currentIndex", this.currentIndex);
    // Event listener for the previous button
    this.prevButton.addEventListener("click", () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.numItems) % this.numItems;
      // console.log("currentIndex", currentIndex);

      this.updateSlider(this.currentIndex);
      console.log("prev this.currentIndex", this.currentIndex);
    });

    // Event listener for the next button
    this.nextButton.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % this.numItems;
      console.log("beforenextBtnClicked", this.currentIndex);
      this.updateSlider();
    //   this.updateSlider(this.currentIndex);
      console.log("after next this.currentIndex", this.currentIndex);
    });

    this.updateSlider(this.currentIndex);
  }

  updateSlider() {
    angle = 360 / this.numItems;
    console.log("updateSlider this.currentIndex", this.currentIndex);
    const newRotation = -this.currentIndex * angle;
    this.sliders.style.transition = "transform 0.4s ease-in-out";
    this.sliders.style.transform = `translateX(${newRotation}%)`;
    // console.log(currentIndex);
    if (this.currentIndex === 0) {
      this.prevButton.style.display = "none";
    } else {
      this.prevButton.style.display = "block";
    }
    if (this.currentIndex === 3) {
      this.nextButton.style.display = "none";
    } else {
      this.nextButton.style.display = "block";
    }
  }
}

export default HomeNews;
