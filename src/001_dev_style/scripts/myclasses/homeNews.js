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
    this.beforenumItems = sliders.children.length;
    console.log("this.beforenumItems", this.beforenumItems);

    prevButton.disabled = true;
    nextButton.disabled = false;
    this.prevButton.style.display = "none";
    sliders.style.transform = `translateX(0%)`;

    //roop slide
    const firstSlide = this.sliders.children[0].cloneNode(true);
    const lastSlide =
      this.sliders.children[this.beforenumItems - 1].cloneNode(true);
    this.sliders.appendChild(firstSlide);
    this.sliders.insertBefore(lastSlide, this.sliders.children[0]);
    console.log("this.sliders", this.sliders);
    this.numItems = this.sliders.children.length;
    console.log("this.numItems", this.numItems);

    this.sliders.addEventListener("click", () => {
      this.pauseAutoSlide();
    });
  }

  start() {
    this.currentIndex = 1;

    this.updateSlider(this.currentIndex);

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
    const intervalTime = 1000;
    console.log("index", index);
    if (index === 0) {
      setTimeout(() => {
        this.sliders.style.transition = "none";
        this.currentIndex = this.numItems;
        this.updateSlider(this.currentIndex);
        this.sliders.offsetHeight;
        this.sliders.style.transition = "";
      }, intervalTime);
    }
    if (index === this.numItems + 1) {
      setTimeout(() => {
        this.sliders.style.transition = "none";
        this.currentIndex = 1;
        this.updateSlider(this.currentIndex);
        this.sliders.offsetHeight;
        this.sliders.style.transition = "";
      }, intervalTime);
    }

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
      this.sliders.children[this.currentIndex].classList.add("fade-out");

      setTimeout(() => {
        this.sliders.children[this.currentIndex].classList.add("hide");
      }, 2500);
    }

    this.sliders.style.transform = `translateX(-${index * 90}%)`;

    this.sliders.children[index].classList.add("fade-in");

    setTimeout(() => {
      //   this.sliders.children[index].classList.remove("fade-in");
      this.sliders.children[index].classList.add("show");
    }, 500);

    this.currentIndex = index;
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
        this.seeBtn(this.currentIndex);
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
