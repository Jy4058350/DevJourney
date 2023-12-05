let slideIndex = 0;
let newIndex = 0;
let textIndex = 0;

function countUp(slideIndex, _size) {
  console.log("before", slideIndex)
  if (slideIndex >= _size - 1) {
    slideIndex = 0;
    // return slideIndex;
  } else {
    slideIndex++;
  }
  console.log("after", slideIndex)
  return slideIndex;
}
function countUpSlide(slideIndex, _size) {
  if (slideIndex >= _size - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  return slideIndex;
}

function slideTextIndex(slideIndex) {
  return slideIndex;
}

// function updateSlideIndex() {
//   slideIndex = newIndex;
//   newIndex = 0;
// }

// function TextIndex(slideIndex) {
function calculateEvenNumber(slideIndex) {
  slideIndex++;
  // if (slideIndex === 0) {
  if (slideIndex === 0 || slideIndex >= 16) {
    textIndex = 0;
    return textIndex;
  }
  if (slideIndex % 2 === 1) {
    textIndex++;
    return textIndex;
  }

  if (slideIndex % 2 === 0) {
    return textIndex;
  }
}

// function resetCount(slideIndex) {
//   if (slideIndex >= 15) {
//     slideIndex = 0;
//   }
//   return slideIndex;
// }

export {
  countUp,
  slideTextIndex,
  // updateSlideIndex,
  calculateEvenNumber,
  // resetCount,
  countUpSlide,
};
