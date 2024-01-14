import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";
import _ from "lodash";

gsap.registerPlugin(ScrollTrigger);

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  $.headerWrap = iNode.qs(".Header__Wrap");

  // console.log("cling init");
  $.fv = iNode.qs(".fv");
  $.sectionTemplate = iNode.qs(".section--home-panels");
  $.homeNews = iNode.qs(".home-news");
  $.footer = iNode.qs(".Footer");

  $.header = iNode.qs("#header");
  $.logoGray = iNode.qs(".Logo__gray");
  $.logoWhite = iNode.qs(".Logo__white");
  console.log("$.logoWhite", $.logoWhite);
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
  // $.windowWidth = window.innerWidth;

  // $.scrollTriggerEnd = _scrollTriggerEnd();
}

function _scrollTriggerEnd() {
  const fvfooterHeight = sumHeight($.fv, $.footer);
  console.log("fvfooterHeight", fvfooterHeight);
  const customHegiht = sumHeight($.sectionTemplate, $.homeNews);

  const scrollTriggerEnd = fvfooterHeight + customHegiht;
  return scrollTriggerEnd;
}

function sumHeight(a, b) {
  if (!a || !b) return 0;
  return a.offsetHeight + b.offsetHeight;
}

function _clingTo() {
  const height = _scrollTriggerEnd();
  console.log("height", height);
  gsap.registerPlugin(ScrollTrigger);
  if (!ScrollTrigger) {
    console.error("ScrollTrigger is not defined");
    return;
  }

  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onEnter: () => {
      iNode.toggleClass($.headerWrap, "Header--white", true);
      // iNode.toggleClass(header, "Header--white", true);

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
      iNode.toggleClass($.headerWrap, "Header--white", false);
      // iNode.toggleClass(header, "Header--white", false);
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

// export default cling;
export { cling };
