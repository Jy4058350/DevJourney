import SlideIndexManager from "./slideIndexManager";

let isDragging = false;
let startX = 0;
let currentX = 0;
let angle;
let debounceTimer;

class HomeNews {
  // constructor(sliders, prevButton, nextButton, SlideIndexManager, increment) {
  constructor(sliders, prevButton, nextButton) {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.initDOM(sliders, prevButton, nextButton);

    this.isPaused = false;
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
    this.init();

    this.prevButton.addEventListener("click", () => {
      this.prevButton.disabled = false;
      this.updateIndex(-1);
      this.updateSlider(SlideIndexManager.getIndex());
      this.seeBtn(SlideIndexManager.getIndex());

      this.pauseAutoSlide();
    });

    this.nextButton.addEventListener("click", () => {
      console.log("nexBtnClick");
      this.updateIndex(1);
      this.updateSlider(SlideIndexManager.getIndex());
      this.seeBtn(SlideIndexManager.getIndex());
      this.pauseAutoSlide();
    });

    this.startAutoSlide();
  }

  startAutoSlide() {
    const intervalTime = 3000;

    this.autoSlideInterval = setInterval(() => {
      this.isAutoSlide = true;
      this.updateIndex(1);
      this.updateSlider(SlideIndexManager.getIndex());
      this.seeBtn(SlideIndexManager.getIndex());
    }, intervalTime);
  }

  updateIndex(increment) {
    const currentIndex = SlideIndexManager.getIndex();
    const totalSlides = this.sliders.children.length;

    let newIndex;
    if (currentIndex === totalSlides - 1) {
      newIndex = 1;
    } else {
      newIndex = (currentIndex + increment) % totalSlides;
    }
    SlideIndexManager.setIndex(newIndex);
  }

  updateSlider(index) {
    // console.log("updateSlider index", index);

    // console.log("Current index: ", SlideIndexManager.getIndex()); //Debug code
    if (index < 0 || index > this.sliders.children.length) {
      console.error(`Invalid index: ${index + 1} `);
      return;
    }
    this.removeSliderClasses();

    this.setSliderTransform(index);
    this.setSliderTransition(index);

    // console.log("isPaused", this.isPaused, index);
    this.fadeOut(SlideIndexManager.getIndex(), this.isAutoSlide, this.isPaused);
    this.fadeIn(index, this.isAutoSlide, this.isPaused);

    this.isAutoSlide = false;

    this.dispatchSlideChangeEvent();
  }

  dispatchSlideChangeEvent() {
    const event = new CustomEvent("slideChange", {
      detail: SlideIndexManager.getIndex(),
    });
    window.dispatchEvent(event);
  }

  setSliderTransform(index) {
    let slidePercentage = 360 / this.numItems;
    this.sliders.style.transform = `translateX(-${index * slidePercentage}%)`;
  }

  setSliderTransition(index) {
    const currentIndex = SlideIndexManager.getIndex();
    // console.log("currentIndex, index", currentIndex, index);
    if (currentIndex === 1 && index === 1) {
      console.log("setSliderTransition", index);
      this.sliders.style.transition = "none";
      this.sliders.offsetWidth;
    } else {
      this.sliders.style.transition = "";
    }
  }

  removeSliderClasses() {
    for (let i = 0; i < this.sliders.children.length; i++) {
      this.sliders.children[i].classList.remove(
        "fade-in",
        "show",
        "fade-out",
        "hide"
      );
    }
  }

  fadeOut(index, isAutoSlide, isPaused) {
    // index -= 1;
    if (
      !isAutoSlide ||
      index < 0 ||
      index >= this.sliders.children.length ||
      isPaused ||
      index === 5
    ) {
      console.log("fadeOut nothing return", index);
      return;
    }
    if (index !== 5) {
      this.sliders.children[index].classList.add("fade-out");
      setTimeout(() => {
        this.sliders.children[index].classList.add("hide");
      }, 2500);
    } else if (index == 5) {
      console.log("fadeOut nothing return", index);
    }
  }

  fadeIn(index, isAutoSlide) {
    // if (isPaused) {
    //   return;
    // }
    this.sliders.children[index].classList.add("fade-in");
    if (index !== 1) {
      console.log("index==!1");
      setTimeout(
        () => {
          this.sliders.children[index].classList.add("show");
        },
        isAutoSlide ? 500 : 100
      );
    } else if (index == 1) {
      console.log("index==1");
      this.sliders.children[index].classList.add("show");
    }
  }

  seeBtn(index, increment = 1) {
    let newIndex =
      ((SlideIndexManager.getIndex() -
        1 +
        increment +
        this.sliders.children.length) %
        this.sliders.children.length) +
      1;
    if (index === 2) {
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

        if (diffX > 0 && SlideIndexManager.getIndex() > 0) {
          this.updateIndex(-1);
        } else if (
          diffX < 0 &&
          SlideIndexManager.getIndex() < this.numItems - 1
        ) {
          // console.log("0 > diffX", diffX);
          this.updateIndex(1);
        }

        this.updateSlider(SlideIndexManager.getIndex());
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
    this.isPaused = true;
    return true;
  }
}

export default HomeNews;