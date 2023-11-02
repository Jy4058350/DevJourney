import gsap from "gsap";
import { iNode } from "../helper/iNode.js";

const menu = {
  init,
};

const $ = {};
let isOpen = false;
let t1 = null;

function init() {
  $.container = iNode.qs("#global-container");
  $.btn = iNode.qs(".btn-menu");
  $.inner = iNode.qs(".btn-menu_inner");
  $.wraps = iNode.qsa(".btn-menu_wrap");
  $.bars = iNode.qsa(".btn-menu_bar");
  $.page = iNode.qs("#page-container");

  _handlePointerDownAndMouseEnter();
  t1 = _onClickSelector();
}

function _handlePointerDownAndMouseEnter() {
  $.btn.addEventListener("pointerdown", _handlePointerDown);
  $.btn.addEventListener("mouseenter", _handleMouseEnter);
}

function _onClickSelector() {
  const tl = gsap.timeline({ paused: true });

  tl.to($.bars, {
    height: "3px",
    duration: 0.2,
    backgroundColor: "black",
    borderRadius: 5,
  });
  return tl;
}

function _handlePointerDown() {
  if (!isOpen) {
    t1.play();
  } else {
    t1.reverse();
  }
}

function _handleMouseEnter() {
  const tl = gsap.timeline({
    defaults: { duration: 0.2, stagger: 0.1, ease: "power1.inOut" },
  });
  tl.set($.bars, {
    transformOrigin: "right center",
  })
    .to($.bars, {
      scaleX: 0,
    })
    .set($.bars, {
      transformOrigin: "left center",
    })
    .to($.bars, {
      scaleX: 1,
    })
    .set($.wraps, {
      rotate: 0,
    })
    .to($.wraps, {
      rotate: 180,
    });
}

export default menu;
