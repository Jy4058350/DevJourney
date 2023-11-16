import { iNode } from "../helper";

const elementPos = {
  init,
  calcHeaderHeight,
  calcFooterPos,
};

const $ = {};

function init() {
  $.headerHeight = iNode.getElById("header").offsetHeight;
  console.log($.headerHeight);
  $.announcementHeight = iNode.getElById("section-announcement").offsetHeight;
  // console.log($.announcementHeight);
  $.fvMain = iNode.getElById("fv-main");
  console.log($.fvMain);
  $.footer = iNode.getElById("footer");
  $.footerHeight = $.footer.offsetHeight;
  console.log($.footerHeight);
  console.log($.footer);
  $.fvMainRect = $.fvMain.getBoundingClientRect();
  console.log($.fvMainRect);
  $.fvMainAbsoluteBottom = $.fvMainRect.bottom;

  console.log($.fvMainAbsoluteBottom);
  $.footerRect = $.footer.getBoundingClientRect();
  console.log($.footerRect);
  $.footerAbsoluteTop = $.footerRect.top;
  console.log($.footerAbsoluteTop);

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;
  console.log($.gap);

  $.fvTop = iNode.getElById("fv");
}

function calcHeaderHeight() {
  $.fvTop.style.setProperty("--fv-top", `${$.headerHeight}px`);
  return $.headerHeight;
}

function calcFooterPos() {
  console.log("resizing test");
  // $.footer.style.setProperty("--footer-top", `${$.footerHeight}px`);
  $.footer.style.setProperty("--footer-top", `${$.gap}px`);
  return $.footerAbsoluteTop;
}

export { elementPos };
