import { iNode } from "../helper";

const elementPos = {
  init,
  calcHeaderHeight,
  calcFooterPos,
  resizingCalcFooterPos,
};

const $ = {};

function init() {
  $.headerHeight = iNode.getElById("header").offsetHeight;
  // console.log($.headerHeight);
  $.announcementHeight = iNode.getElById("section-announcement").offsetHeight;
  // console.log($.announcementHeight);
  $.fvMain = iNode.getElById("fv-main");
  // console.log($.fvMain);
  $.footer = iNode.getElById("footer");
  $.footerHeight = $.footer.offsetHeight;
  // console.log($.footerHeight);
  // console.log($.footer);
  $.fvMainRect = $.fvMain.getBoundingClientRect();
  // console.log($.fvMainRect);
  $.fvMainAbsoluteBottom = $.fvMainRect.bottom;

  // console.log($.fvMainAbsoluteBottom);
  $.footerRect = $.footer.getBoundingClientRect();
  // console.log($.footerRect);
  $.footerAbsoluteTop = $.footerRect.top;
  // console.log($.footerAbsoluteTop);

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;
  // console.log($.gap);

  $.fvTop = iNode.getElById("fv");
}

function calcHeaderHeight() {
  $.fvTop.style.setProperty("--fv-top", `${$.headerHeight}px`);
  return $.headerHeight;
}

function calcFooterPos() {
  // $.footer.style.setProperty("--footer-top", `${$.footerHeight}px`);
  $.footer.style.setProperty("--footer-top", `${$.gap}px`);
  return $.footerAbsoluteTop;
}
function calcNextFooterPos() {
  let gap = 0;
  $.footer.style.setProperty("--footer-margin-top", `${gap}px`);
  const nextFvMainRect = $.fvMain.getBoundingClientRect();
  const nextFooterRect = $.footer.getBoundingClientRect();
  const nextFvMainRectBottom = nextFvMainRect.bottom;
  const nextFooterRectTop = nextFooterRect.top;
  gap = nextFvMainRectBottom - nextFooterRectTop;

  $.footerMarginTop = iNode.getElById("footer").offsetTop;
  $.footer.style.setProperty("--footer-margin-top", `${gap}px`);
}

let timerId = null;
function resizingCalcFooterPos() {
  window.addEventListener("resize", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      calcNextFooterPos();
    }, 500);
  });
}

export { elementPos };
