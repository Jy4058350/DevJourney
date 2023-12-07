const circle = {
  createCircle,
};

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circleContainer.appendChild(circle);
  console.log("add circle");
  
  circle.addEventListener("click", function() {
      Slider.seek(index-1);
      console.log("click");
  })
}

export { circle };
