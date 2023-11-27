let slideIndex = 0;
let newIndex = 0;
let textIndex = 0;

// function countUp(slideIndex, _size) {
function countUp(slideIndex, _size) {
  if (slideIndex >= 8) {
    slideIndex = 0;
    // console.log(uResetAlpha);

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
  updateSlideIndex,
  calculateEvenNumber,
  // resetCount,
}
