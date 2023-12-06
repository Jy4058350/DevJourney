// let slideIndex = 0;
// let newIndex = 0;
// let index = 0;

function countUp(index, size) {
  console.log(index, "before index");
  index = (index + 1) % size;
  console.log(index, "after index");
  return index;
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
function calculateEvenNumber(index) {
  // let evenIdx = 0;
  //  console.log(index, "index")
  // if (index === 0) {
  if (index === 0 || index >= 16) {
    index = 0;
    return index;
  }
  if (index % 2 === 1) {
    index++;
    return index;
  }

  if (index % 2 === 0) {
    return index;
  }

  // evenIdx++;
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
