import { set } from "lodash";
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
    this.prevButton.style.display = "none";
    sliders.style.transform = `translateX(0%)`;
  }

  updateIndex(increment) {
    if (this.currentIndex === 5 && increment === 1) {
      this.currentIndex = 1;
    } else {
      this.currentIndex = (this.currentIndex + increment) % this.numItems;
    }
  }

  start() {
    this.init();
    this.currentIndex = 0;

    this.prevButton.addEventListener("click", () => {
      this.prevButton.disabled = false;
      this.updateIndex(-1);
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);

      this.pauseAutoSlide();
    });

    this.nextButton.addEventListener("click", () => {
      console.log("nexBtnClick");
      this.updateIndex(1);
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);
      this.pauseAutoSlide();
    });

    this.startAutoSlide();
  }

  startAutoSlide() {
    const intervalTime = 3000;

    this.autoSlideInterval = setInterval(() => {
      this.updateIndex(1);
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);
    }, intervalTime);
  }

  dispatchSlideChangeEvent() {
    const event = new CustomEvent("slideChange", { detail: this.currentIndex });
    window.dispatchEvent(event);
  }

  updateSlider(index) {
    if (index < 0 || index > this.sliders.children.length) {
      console.error(`Invalid index: ${index} `);
    }
    for (let i = 0; i < this.sliders.children.length; i++) {
      this.sliders.children[i].classList.remove(
        "fade-in",
        "show",
        "fade-out",
        "hide"
      );
    }

    if (this.currentIndex !== null) {
      this.fadeOut(this.currentIndex);
    }
    this.fadeIn(index);

    let slidePercentage = 360 / this.numItems;
    this.sliders.style.transform = `translateX(-${index * slidePercentage}%)`;

    if (index === 0) {
      this.sliders.style.transition = "none";
    } else {
      this.sliders.style.transition = "";
    }

    if (this.currentIndex === 5 && index === 1) {
      this.sliders.style.transition = "none";
      this.sliders.style.transform = `translateX(0%)`;
      void this.sliders.offsetWidth;
    }

    this.sliders.style.transition = "";
    this.sliders.style.transform = `translateX(-${index * slidePercentage}%)`;

    this.currentIndex = index;
    console.log("this.currentIndex", this.currentIndex);

    this.dispatchSlideChangeEvent();
  }

  seeBtn(index) {
    if (index === 0) {
      this.prevButton.disabled = true;
      this.prevButton.style.display = "none";
    } else {
      this.prevButton.disabled = false;
      this.prevButton.style.display = "block";
    }
    if (index === this.numItems - 1) {
      this.nextButton.disabled = true;
      this.nextButton.style.display = "none";
    } else {
      this.nextButton.disabled = false;
      this.nextButton.style.display = "block";
    }
  }

  init() {
    this.sliders.addEventListener("mousedown", this.handleMouseDown);
    this.sliders.addEventListener("click", () => {
      this.pauseAutoSlide();
    });
    this.addDummySlide();
    this.setChildStyle();
  }

  calculateX(i) {
    switch (i) {
      case 0:
        return -240;
      case 1:
        return 0;
      case 2:
        return 90;
      case 3:
        return 180;
      case 4:
        return 240;
      default:
        return 0; // Default value for any other index
    }
  }

  setChildStyle() {
    // console.log("this.sliders", this.sliders.children);
    const x = 360 / this.numItems;
    for (let i = 0; i < this.sliders.children.length; i++) {
      //   this.sliders.children[i].style.transform = `translateX(${i * x}%)`;
      this.sliders.children[i].style.left = `${i * x}%`;
      this.sliders.children[i].style.position = "absolute";
    }
  }

  addDummySlide() {
    const firstSlide = this.sliders.children[0].cloneNode(true);
    const lastSlide = this.sliders.children[this.numItems - 1].cloneNode(true);

    this.sliders.appendChild(firstSlide);
    this.sliders.insertBefore(lastSlide, this.sliders.children[0]);

    this.numItems += 2;
  }

  handleMouseDown(e) {
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
          this.updateIndex(-1);
        } else if (diffX < 0 && this.currentIndex < this.numItems - 1) {
          // console.log("0 > diffX", diffX);
          this.updateIndex(1);
        }

        this.updateSlider(this.currentIndex);
      }, debounceDelay);
    }
  }

  handleMouseUp() {
    // console.log("handleMouseUp");
    this.sliders.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseLeave() {
    this.sliders.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleTransitionEnd() {
    this.sliders.style.transition = "none";
  }

  pauseAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  fadeIn(index) {
    this.sliders.children[index].classList.add("fade-in");
    setTimeout(() => {
      this.sliders.children[index].classList.add("show");
    }, 500);
  }

  fadeOut(index) {
    this.sliders.children[index].classList.add("fade-out");
    setTimeout(() => {
      this.sliders.children[index].classList.add("hide");
    }, 2500);
  }
}

export default HomeNews;
