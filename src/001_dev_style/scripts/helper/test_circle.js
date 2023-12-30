import gsap from "gsap";
import { iNode } from "./iNode.js";
import { homeNews } from "../component/home-news.js";

const circle = {
  createCircle,
};

document.addEventListener("DOMContentLoaded", function () {
  // const slider = gsap.timeline();
  // const circleContainer = iNode.getElById("circleContainer");

  const { sliders, prevButton, nextButton } = homeNews.init();
  homeNews.initEventListenres(sliders, prevButton, nextButton);

  // for (let i = 0; i < 16; i++) {
  //   slider.to(`.fv_holder`, {
  //     x: `-${i * 100}%`,
  //     duration: 1,
  //   });
  //   createCircle(i + 1, slider);
  // }
});

function createCircle(index, slider) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circleContainer.appendChild(circle);
  console.log("add circle");

  circle.addEventListener("click", function () {
    slider.seek(index - 1);
    console.log("click");
    updateCircleColors(index);
  });
}

function updateCircleColors(activeIndex) {
  const circles = iNode.qsa(".circle");
  circles.forEach((circle, index) => {
    circle.style.backgroundColor = index + 1 === activeIndex ? "blue" : "gray";
  });
}

export { circle };
