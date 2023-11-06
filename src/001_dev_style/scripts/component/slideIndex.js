let slideIndex = 0;
let newIndex = 0;
let textIndex = 0;

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

function TextIndex(slideIndex) {
  slideIndex++;
  // if (slideIndex === 0) {
  if (slideIndex === 0 || slideIndex >= 15) {
    textIndex = 0;
    return textIndex;
  }
  if (slideIndex % 2 === 0) {
    textIndex++;
    return textIndex;
  }

  if (slideIndex % 2 === 1) {
    return textIndex;
  }

  // if (slideIndex >= 15) {
  //   slideIndex = 0;
  //   textIndex = 0;
  //   return textIndex;
  // }
  // console.log(textIndex);
  // return textIndex;
}

export { countUp, slideTextIndex, updateSlideIndex, TextIndex };
