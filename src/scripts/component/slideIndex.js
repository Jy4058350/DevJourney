// let slideIndex = 0;
// let newIndex = 0;
// let index = 0;

function countUp(index, size) {
  // console.log(index, "before index");
  index = (index + 1) % size;
  // console.log(index, "after index");
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
function getMappedNumber(index) {
  index = Math.max(0, index);// 0以上の整数にする
  const mappedIndex = Math.floor(index / 2) + (index % 2);
  return mappedIndex;
}


export { countUp, slideTextIndex, getMappedNumber, countUpSlide };
