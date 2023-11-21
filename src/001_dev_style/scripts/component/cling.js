import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  $.container = iNode.qs("#global-container");
  $.header = iNode.qs("#header");
  $.logoGray = iNode.qs(".Logo__gray");
  $.logoWhite = iNode.qs(".Logo__white");
  $.btnColor = iNode.qs(".btn-menu_bar");
  console.log($.btnColor.style.backgroundColor);
  const computedStyle = window.getComputedStyle($.btnColor);
  console.log(computedStyle.backgroundColor);
}

function _clingTo() {
  const height = $.container.offsetHeight;

  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      const header = iNode.qs("#header");
      if (self.direction === 1) {
        header.classList.add("Header--white");
        $.logoGray.style.opacity = 1;
        $.logoWhite.style.opacity = 0;
        console.log($.btnColor.style.backgroundColor);
        // console.log($.btnColor.style);
        console.log($.btnColor);
      } else {
        header.classList.remove("Header--white");
        $.logoGray.style.opacity = 0;
        $.logoWhite.style.opacity = 1;
      }
    },
  });
}

export default cling;
