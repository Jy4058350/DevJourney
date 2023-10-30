let slideIndex = 0;
function countUp() {
  slideIndex++;
  if (slideIndex > 15) {
    slideIndex = 0;
  }
  return slideIndex;
}

// export default slideIndex;
export { countUp };
