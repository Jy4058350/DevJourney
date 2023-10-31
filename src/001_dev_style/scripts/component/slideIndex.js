let slideIndex = 0;

function countUp(slideIndex) {
  slideIndex++;
  if (slideIndex > 15) {
    slideIndex = 0;
  }

  // slideTextIndex(slideIndex);
  return slideIndex;
}

function slideTextIndex(slideIndex) {
  const slideText = document.querySelector(".fv_text-shader");
  const slideTex = document.querySelector(".fv_slider");

  function goTo(slideIndex) {
    slideText.goToNext(slideIndex);
    slideTex.goToNext(slideIndex);
  }
  return slideIndex;
}

function updateSlideIndex() {
  slideIndex = newIndex;
}

export { countUp, slideTextIndex, updateSlideIndex };
