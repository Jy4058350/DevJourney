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

  start() {
    this.currentIndex = 0;
    this.init();
    // this.initEventListenres();
    console.log("this.currentIndex", this.currentIndex);

    this.prevButton.addEventListener("click", () => {
      this.prevButton.disabled = false;
      this.currentIndex =
        (this.currentIndex - 1 + this.numItems) % this.numItems;
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);

      this.pauseAutoSlide();
      //   this.startAutoSlide();
    });

    this.nextButton.addEventListener("click", () => {
      console.log("nexBtnClick");
      this.currentIndex = (this.currentIndex + 1) % this.numItems;
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);

      this.pauseAutoSlide();
      //   this.startAutoSlide();
    });

    this.startAutoSlide();
  }

  startAutoSlide() {
    const intervalTime = 3000;

    this.autoSlideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.numItems;
      this.updateSlider(this.currentIndex);
      this.seeBtn(this.currentIndex);
    }, intervalTime);
  }

  pauseAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  updateSlider(index) {
    if (index < 0 || index > this.sliders.children.length) {
      console.error(`Invalid index: ${index} `);
    }
    for (let i = 0; i < this.sliders.children.length; i++) {
      this.sliders.children[i].classList.remove("fade-in");
    }
    this.sliders.style.transform = `translateX(-${index * 90}%)`;

    this.sliders.children[index].classList.add("fade-in");
    console.log("this.sliders.children[index]", this.sliders.children[index]);

    setTimeout(() => {
      this.sliders.children[index].classList.remove("fade-in");
    }, 1000);
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
}

export default HomeNews;
