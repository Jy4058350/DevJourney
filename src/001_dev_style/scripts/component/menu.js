import gsap from "gsap";
import { iNode } from "../helper/iNode.js";

const menu = {
  init,
};

const $ = {};

function init() {
  $.container = iNode.qs("#global-container");
  $.btn = iNode.qs(".btn-menu");
  $.inner = iNode.qs(".btn-menu_inner");
  $.wrap = iNode.qsa(".btn-menu_wrap");
  $.bar = iNode.qsa(".btn-menu_bar");
  $.page = iNode.qs("#page-container");

  _handlePointerDownAndMouseEnter();
}

function _handlePointerDownAndMouseEnter() {
  $.btn.addEventListener("pointerdown", _handlePointerDown);
  $.btn.addEventListener("mouseenter", _handleMouseEnter);
}

function _handlePointerDown() {}

function _handleMouseEnter() {
  const tl = gsap.timeline();
  tl.to($.wrap[0], {
    default: { duration: 0.2 },
    x: -100,
    y: 100,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to($.wrap[0], {
        duration: 0.2,
        x: 0,
        y: 0,
        ease: "power1.inOut",
      });
    },
  });
}

export default menu;
