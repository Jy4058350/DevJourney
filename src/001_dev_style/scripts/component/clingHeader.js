import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";
import HeaderHandler from "../myclasses/header";

const headerHandler = new HeaderHandler();

gsap.registerPlugin(ScrollTrigger);

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  // headerHandler.init();
  $.fv = iNode.qs(".fv");
  $.footer = iNode.qs(".Footer");
  $.headerWrap = iNode.qs(".Header__Wrap");
  $.sectionTemplate = iNode.qs(".section--home-panels");
  $.homeNews = iNode.qs(".home-news");
  $.header = iNode.qs("#header");
}

function _scrollTriggerEnd() {
  const fvfooterHeight = sumFvFooterHeight($.fv, $.footer);
  // console.log("fvfooterHeight", fvfooterHeight);
  const customHegiht = sumHeight($.sectionTemplate, $.homeNews);

  const scrollTriggerEnd = fvfooterHeight + customHegiht;
  // console.log("scrollTriggerEnd", scrollTriggerEnd);
  return scrollTriggerEnd;
}

function sumFvFooterHeight(a, b) {
  return (a?.offsetHeight || 0) + (b?.offsetHeight || 0);
}

function sumHeight(a, b) {
  if (!a || !b) return 0;
  return a.offsetHeight + b.offsetHeight;
}

function _clingTo() {
  // console.log("_clingTo by cling.js");
  const height = _scrollTriggerEnd();
  // console.log("height", height);
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
      // console.log("onEnter");
      headerHandler.clingToStyleOnEnter();
    },
    onLeaveBack: () => {
      console.log("onLeaveBack");
      headerHandler.clingToStyleOnLeaveBack();
    },
  });
}

export { cling };
