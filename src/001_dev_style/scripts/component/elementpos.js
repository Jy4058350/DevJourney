import { iNode } from "../helper";

const elementPos = {
  init,
  calcHeaderHeight,
  calcFooterPos,
  resizingCalcFooterPos,
  headerIncreaseSpaceToggle,
};

const $ = {};

function init() {
  $.headerHeight = iNode.getElById("header").offsetHeight;
  console.log($.headerHeight);
  document.documentElement.style.setProperty(
    "--header-height",
    $.headerHeight + "px"
  );

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
  console.log($.headerHeight);
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

function headerIncreaseSpaceToggle() {

  window.addEventListener("resize", () => {
    const increaseSpace = iNode.qs(".Header__FlexItem--logo");

    if (window.innerWidth > 960) {
      increaseSpace.classList.add("Header__FlexItem--increaseSpace");
     const nextheaderHeight = iNode.getElById("header").offsetHeight;
     console.log(nextheaderHeight);
     $.fvTop.style.setProperty("--fv-top", `${nextheaderHeight}px`);
    } else {
      increaseSpace.classList.remove("Header__FlexItem--increaseSpace");
    }
  });
}

export { elementPos };
