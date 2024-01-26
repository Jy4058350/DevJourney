import gsap from "gsap";
import { config, dom } from "../helper";
import { scroll } from "./scroll.js";

const menu = {
  init,
};

let isOpen = false,
  clickTl = null;

function init() {
  _handlePointerDownAndMouseEnter();
  clickTl = _onClickSelector();
}

function _handlePointerDownAndMouseEnter() {
  dom.btn.addEventListener(config.event.click, _toggle);
  dom.btn.addEventListener(config.event.mouseenter, _handleMouseEnter);
}

function _toggle() {
  dom.container.classList.toggle("is-open");
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

  tl.to(dom.bars, {
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
  tl.set(dom.bars, {
    transformOrigin: "right center",
  })
    .to(dom.bars, {
      scaleX: 0,
    })
    .set(dom.bars, {
      transformOrigin: "left center",
    })
    .to(dom.bars, {
      scaleX: 1,
    })
    .set(dom.wraps, {
      rotate: 0,
    })
    .to(dom.wraps, {
      rotate: 180,
    });
}

export default menu;
