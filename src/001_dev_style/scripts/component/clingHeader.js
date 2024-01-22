import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";
import HeaderHandler from "../myclasses/header";

const headerHandler = new HeaderHandler();

gsap.registerPlugin(ScrollTrigger);

const cling = {
  init,
  clingTo,
};

const $ = {};

function init() {
  $.fv = iNode.qs(".fv");
  $.sectionTemplate = iNode.qs(".section--home-panels");
  $.homeNews = iNode.qs(".home-news");
}

function getChildEls(el) {
  const children = el.children;
  const childArray = Array.from(children);
  console.log("getChildArray", childArray);

  return childArray;
}

function _scrollTriggerEnd(main, footer) {
  const ChildEls = getChildEls(main);
  console.log("mainChildEls", ChildEls);
  const ch1 = ChildEls[0];
  const ch2 = ChildEls[1];
  const ch3 = ChildEls[2];

  const scrollTriggerEnd = sumELsHeight(footer, ch1, ch2, ch3);
  console.log("scrollTriggerEnd", scrollTriggerEnd);
  return scrollTriggerEnd;
}

function sumELsHeight(...els) {
  const a = els.reduce((sum, el) => sum + (el?.offsetHeight || 0), 0);
  console.log("a", a);
  return a;
}

function clingTo(header, footer) {
  const height = _scrollTriggerEnd(main, footer);
  gsap.registerPlugin(ScrollTrigger);
  if (!ScrollTrigger) {
    console.error("ScrollTrigger is not defined");
    return;
  }

  ScrollTrigger.create({
    trigger: header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onEnter: () => {
      headerHandler.clingToStyleOnEnter();
    },
    onLeaveBack: () => {
      headerHandler.clingToStyleOnLeaveBack();
    },
  });
}

export { cling };
