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

function _scrollTriggerEnd(footer) {
  const scrollTriggerEnd = sumELsHeight(
    footer,
    $.fv,
    $.sectionTemplate,
    $.homeNews
  );
  return scrollTriggerEnd;
}

function sumELsHeight(...els) {
  const a = els.reduce((sum, el) => sum + (el?.offsetHeight || 0), 0);
  return a;
}

function clingTo(header, footer) {
  const height = _scrollTriggerEnd(footer);
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
