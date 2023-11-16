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
  $.announcementHeight = iNode.getElById("section-announcement").offsetHeight;

  $.fvTop = iNode.getElById("fv");
  $.fvMain = iNode.getElById("fv-main");
  $.footer = iNode.getElById("footer");

  $.footerHeight = $.footer.offsetHeight;
  $.fvMainRect = $.fvMain.getBoundingClientRect();
  $.fvMainAbsoluteBottom = $.fvMainRect.bottom;

  $.footerRect = $.footer.getBoundingClientRect();
  $.footerAbsoluteTop = $.footerRect.top;

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;

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
