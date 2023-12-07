const circle = {
  createCircle,
};

function createCircle() {
  const circle = document.createElement("div");
  console.log(circle);
  circle.classList.add("circle");
  console.log(circle);
  circleContainer.appendChild(circle);
  console.log("add circle");
}

export { circle };
