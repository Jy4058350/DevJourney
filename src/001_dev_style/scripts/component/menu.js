import gsap from "gsap";
import { iNode, config } from "../helper";
import { getMenuItem } from "../helper";
import { scroll } from "./scroll.js";

const menu = {
  init,
};

const $ = {};
let isOpen = false,
  clickTl = null;

function init() {
  $.getMenuItem = getMenuItem();
  $.container = iNode.qs("#globalContainer");
  $.btn = iNode.qs(".btn-menu");
  $.inner = iNode.qs(".btn-menu_inner");
  $.wraps = iNode.qsa(".btn-menu_wrap");
  $.bars = iNode.qsa(".btn-menu_bar");
  $.page = iNode.qs("#page-container");

  _handlePointerDownAndMouseEnter();
  clickTl = _onClickSelector();
}

function _handlePointerDownAndMouseEnter() {
  $.btn.addEventListener(config.event.click, _toggle);
  $.btn.addEventListener(config.event.mouseenter, _handleMouseEnter);
}

function _toggle() {
  $.container.classList.toggle("is-open");
  if (!isOpen) {
    clickTl.play();
    scroll.disablePlugin();
  } else {
    clickTl.reverse();
    scroll.enablePlugin();
  }
  isOpen = !isOpen;
}

function _onClickSelector() {
  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3 } });

  tl.to($.bars, {
    height: "3px",
    duration: 0.2,
    backgroundColor: " #dadada",
    borderRadius: 5,
  });
  return tl;
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
