import { iNode } from "../helper";

class HomeNews {
  constructor() {
    this.init();
  }

  init() {
    this.sliders = iNode.qs(".rotation-slider");
    this.prevButton = iNode.qs(".home-news-control-button.Previous");
    this.nextButton = iNode.qs(".home-news-control-button.Next");
    // initDOM(this.sliders, this.prevButton, this.nextButton);

    this.sliders.addEventListener("mousedown", this.handleMouseDown);

    return this;
  }


  handleMouseDown(e) {
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
  
}

export default HomeNews;
