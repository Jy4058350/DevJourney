let slideIndex = 0;
let newIndex = 0;

function countUp(slideIndex) {
  if (slideIndex >= 15) {
    slideIndex = 0;
    return slideIndex;
  }

  slideIndex++;
  updateSlideIndex();
  return slideIndex;
}

function slideTextIndex(slideIndex) {
  return slideIndex;
}

function updateSlideIndex() {
  slideIndex = newIndex;
  newIndex = 0;

}

export { countUp, slideTextIndex, updateSlideIndex };
