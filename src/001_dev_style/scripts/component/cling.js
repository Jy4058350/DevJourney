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
  console.log("cling init");
  $.fv = iNode.qs(".fv");
  $.sectionTemplate = iNode.qs(".section--home-panels");
  $.homeNews = iNode.qs(".home-news");
  $.footer = iNode.qs(".Footer");

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

  // $.scrollTriggerEnd = _scrollTriggerEnd();
}

function _scrollTriggerEnd() {
  // const fvHeight = $.fv.offsetHeight;
  // const footerHeight = $.footer.offsetHeight;
  const commonHeight = commonElHeight($.fv, $.footer);
  console.log("commonHeight", commonHeight);

  // const sectionTemplateHeight = $.sectionTemplate.offsetHeight;
  // const homeNewsHeight = $.homeNews.offsetHeight;

  const customHegiht = customElHeight($.sectionTemplate, $.homeNews);
  console.log("customHegiht", customHegiht);
  // const scrollTriggerEnd =
  //   fvHeight + sectionTemplateHeight + homeNewsHeight + footerHeight;

  const scrollTriggerEnd = calcScrollTriggerEnd(commonHeight, customHegiht);
  return scrollTriggerEnd;
}

function commonElHeight(el1, el2) {
  const fvHeight = el1.offsetHeight;
  const footerHeight = el2.offsetHeight;
  const commonElHeight = fvHeight + footerHeight;
  return commonElHeight;
}

function customElHeight(el1, el2) {
  if (!el1 || !el2) {
    return 0;
  }
  const el1Height = el1.offsetHeight;
  const el2Height = el2.offsetHeight;
  const customElHeight = el1Height + el2Height;
  return customElHeight;
}

function calcScrollTriggerEnd(height1, height2) {
  const totalheight = height1 + height2;
  return totalheight;
}

function _clingTo() {
  const scrollTriggerEnd = _scrollTriggerEnd();
  console.log("clingTo");
  gsap.registerPlugin(ScrollTrigger);
  const height = scrollTriggerEnd;
  if (!ScrollTrigger) {
    console.error("ScrollTrigger is not defined");
    return;
  }
  if (ScrollTrigger) {
    console.log("ScrollTrigger is defined");
  }

  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      // const header = iNode.qs("#header");
      // console.log("onUpdate");
    },
    onEnter: () => {
      console.log("onEnter");
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
      console.log("onLeaveBack");
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

// export default cling;
export { cling };
