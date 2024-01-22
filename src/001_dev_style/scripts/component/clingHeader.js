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
  getChildEls(main, footer);
}

function getChildEls(el, footer) {
  const children = el.children;
  const childArray = Array.from(children);
  console.log("childArray", childArray);
  const c1 = childArray[0].offsetHeight;
  const c2 = childArray[1].offsetHeight;
  const c3 = childArray[2].offsetHeight;

  console.log("c1+c2+c3", c1 + c2 + c3 + footer.offsetHeight);
  return childArray;
}

function _scrollTriggerEnd(footer, main) {
  console.log("main", main);
  const fv = main.querySelector(".fv");
  const sectionTemplate = main.querySelector(".section--home-panels");
  const homeNews = main.querySelector(".home-news");

  const scrollTriggerEnd = sumELsHeight(footer, fv, sectionTemplate, homeNews);
  return scrollTriggerEnd;
}

function sumELsHeight(...els) {
  const a = els.reduce((sum, el) => sum + (el?.offsetHeight || 0), 0);
  console.log("a", a);
  return a;
}

function clingTo(header, footer) {
  const height = _scrollTriggerEnd(footer, main);
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
