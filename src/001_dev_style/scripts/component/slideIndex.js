

let slideIndex = 0;
function countUp() {
  slideIndex++;
  if (slideIndex > 15) {
    slideIndex = 0;
  }

  slideTextIndex(slideIndex);
  return slideIndex;
}

function slideTextIndex(slideIndex) {
  const slideText = document.querySelector(".fv_text-shader");
  // console.log(slideText);

  function goTo(index) {
    slideText.goToNext(index);
  }
  return slideIndex;
}

export { countUp, slideTextIndex };
