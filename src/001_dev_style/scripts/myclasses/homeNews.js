import { iNode } from "../helper";

let isDragging = false;
let startX = 0;
let currentX = 0;
let angle;
let debounceTimer;

class HomeNews {
  constructor(sliders, prevButton, nextButton) {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.initDOM(sliders, prevButton, nextButton);
  }
  initDOM(sliders, prevButton, nextButton) {
    this.sliders = sliders;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.numItems = sliders.children.length;
    prevButton.disabled = true;
    nextButton.disabled = false;
    sliders.style.transform = `translateX(0%)`;
  }

  start() {
    this.currentIndex = 0;
    this.init();
    this.initEventListenres();
  }

  init() {
    this.sliders.addEventListener("mousedown", this.handleMouseDown);
  }

  handleMouseDown(e) {
    console.log("e.target", e.target);
    console.log("e.type", e.type);
    console.log("e.timeStamp", e.timeStamp);
    isDragging = true; // This is the flag to check if the mouse is being draged
    startX = e.clientX; // Get the initial position of the mouse
    currentX = e.clientX; // It initializes the variable currentX with the same value as starX

    this.sliders.addEventListener("mousemove", this.handleMouseMove);
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

  initEventListenres() {
    this.prevButton.addEventListener("click", () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.numItems) % this.numItems;
      this.updateSlider(this.currentIndex);
    });

    this.nextButton.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % this.numItems;
      this.updateSlider();
    });

    this.updateSlider(this.currentIndex);
  }

  updateSlider() {
    angle = 360 / this.numItems;
    const newRotation = -this.currentIndex * angle;
    this.sliders.style.transition = "transform 0.4s ease-in-out";
    this.sliders.style.transform = `translateX(${newRotation}%)`;
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
