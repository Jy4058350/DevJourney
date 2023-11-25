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
  $.btn = iNode.qs(".btn-menu");
  $.HeaderIcon = iNode.qs(".Header__Icon");
  $.headerMainNav = iNode.qs(".Header__MainNav");
  $.secondNav = iNode.qs(".Header__secondaryNav");
  $.windowWidth = window.innerWidth;
  if ($.windowWidth > 1280) {
    _headerIncrease();
  }
}

function _headerIncrease() {
  $.HeaderFlex.classList.add("Header__FlexItem--increaseSpace");
  $.btn.style.display = "none";
  $.HeaderIcon.style.display = "none";
  $.headerMainNav.style.opacity = 1;
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
    },
    onEnter: () => {
      console.log("Entering viewport (scrolling down)");
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
      console.log("Entering viewport (scrolling up)");
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
