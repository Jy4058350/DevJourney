import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  $.globalContainer = iNode.qs("#globalContainer");
  $.header = iNode.qs("#header");
  $.logoGray = iNode.qs(".Logo__gray");
  $.logoWhite = iNode.qs(".Logo__white");
  $.btnBars = iNode.qsa(".btn-menu_bar");
  $.colorGray = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-gray"
  );
  $.cart = iNode.qs(".Icon--Wrap--clickable");
  $.HeaderFlex = iNode.qs(".Header__FlexItem--logo");
  $.btn = iNode.qs(".btn-menu");
  $.HeaderIcon = iNode.qs(".Header__Icon");
  $.headerMainNav = iNode.qs(".Header__MainNav");
  $.secondNav = iNode.qs(".Header__secondaryNav");
  $.windowWidth = window.innerWidth;
}

function _clingTo() {
  //this calc is not correct
  // const height = $.globalContainer.offsetHeight;
  const height = 1000;
  console.log(height);

  

  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      const header = iNode.qs("#header");
    },
    onEnter: () => {
      iNode.toggleClass(header, "Header--white", true);
      iNode.setStyles($.logoGray, { opacity: 1 });
      iNode.setStyles($.logoWhite, { opacity: 0 });
      $.btnBars.forEach((btnBar) => {
        iNode.setStyles(btnBar, { backgroundColor: "var(--color-gray)" });
      });
      iNode.setStyles($.cart, { color: "var(--color-gray)" });
      iNode.setStyles($.headerMainNav, { color: "var(--color-gray)" });
      iNode.setStyles($.secondNav, { color: "var(--color-gray)" });
    },
    onLeaveBack: () => {
      iNode.toggleClass(header, "Header--white", false);
      iNode.setStyles($.logoGray, { opacity: 0 });
      iNode.setStyles($.logoWhite, { opacity: 1 });
      $.btnBars.forEach((btnBar) => {
        iNode.setStyles(btnBar, { backgroundColor: "var(--color-border)" });
      });
      iNode.setStyles($.cart, { color: "var(--color-border)" });
      iNode.setStyles($.headerMainNav, { color: "var(--color-border)" });
      iNode.setStyles($.secondNav, { color: "var(--color-border)" });
    },
  });
}

export default cling;
