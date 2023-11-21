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
  // $.btnColor = iNode.qs(".btn-menu_bar");
  $.btnBars = iNode.qsa(".btn-menu_bar");
  $.colorGray = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-gray"
  );
  $.cart = iNode.qs(".Icon--Wrap--clickable");

  $.HeaderFlex = iNode.qs(".Header__FlexItem--logo");
  $.windowWidth = window.innerWidth;
  if ($.windowWidth > 1280) {
    _headerIncrease();
  }
}

function _headerIncrease() {
  $.HeaderFlex.classList.add("Header__FlexItem--increaseSpace");
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
        // $.btnColor.style.backgroundColor = 'var(--color-gray)';
        $.btnBars.forEach((btnBar) => {
          // btnBar.style.backgroundColor = $.colorGray;
          btnBar.style.backgroundColor = "var(--color-gray)";
        });
        $.cart.style.color = "var(--color-gray)";
      } else {
        header.classList.remove("Header--white");
        $.logoGray.style.opacity = 0;
        $.logoWhite.style.opacity = 1;
        // $.btnColor.style.backgroundColor = 'var(--color-border)';
        // $.btnColor.style.backgroundColor = 'var(--color-black)';
        $.btnBars.forEach((btnBar) => {
          btnBar.style.backgroundColor = "var(--color-border)";
        });
        $.cart.style.color = "var(--color-border)";
      }
    },
  });
}

export default cling;
