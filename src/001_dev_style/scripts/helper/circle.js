import gsap from "gsap";
import { iNode } from "./iNode.js";

const circle = {
  createCircle,
};

document.addEventListener("DOMContentLoaded", function () {
  const slider = gsap.timeline();
  const circleContainer = iNode.getElById("circleContainer");

  for (let i = 0; i < 16; i++) {
    // slider.to(`.slide:nth-child(${i + 1})`, { x: `-${i * 100}%`, duration: 1 });
    createCircle(i + 1);
  }
});

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circleContainer.appendChild(circle);
  console.log("add circle");

  circle.addEventListener("click", function () {
    Slider.seek(index - 1);
    console.log("click");
    updateCircleColors();
  });
}

function updateCircleColors() {
  const circles = iNode.qsa(".circle");
  circles.forEach((circle, index) => {
    circle.style.backgroundColor = index + 1 === activeIndex ? "blue" : "gray";
  });
}

export { circle };
