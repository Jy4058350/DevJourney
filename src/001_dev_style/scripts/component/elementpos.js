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
  // console.log($.headerHeight);
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
  // console.log($.headerHeight);
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

function _toEm(px, rootfontsize) {
  const emValue = px / rootfontsize;
  console.log(emValue);
  console.log(window.innerWidth);
  return emValue;
}

function getWindowWidth(rootfontsize = 16) {
  return (
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) / rootfontsize
  );
}

function headerIncreaseSpaceToggle() {
  window.addEventListener("resize", () => {
    const increaseSpace = iNode.qs(".Header__FlexItem--logo");
    // const headerNav = iNode.qs(".Header__MainNav");
    const headerNav = iNode.qs(".HorizontalList");
    const headerHunber = iNode.qsa(".Header__FlexItem--fill");
    console.log(headerNav);
    const emValue = _toEm(1280, 16);
    if (getWindowWidth() > emValue) {
      increaseSpace.classList.add("Header__FlexItem--increaseSpace");
      const nextheaderHeight = iNode.getElById("header").offsetHeight;
      $.fvTop.style.setProperty("--fv-top", `${nextheaderHeight}px`);
      // headerNav.classList.add("Header__MainNav--open");
      headerNav.style.opacity = 1;
      headerHunber.forEach((item) => {
        // item.classList.add("Header__Entrance--open");
        item.style.opacity = 0;
      });
    } else {
      increaseSpace.classList.remove("Header__FlexItem--increaseSpace");
      // headerNav.classList.remove("Header__MainNav--open");
      headerNav.style.opacity = 0;
      headerHunber.forEach((item) => {
        // item.classList.remove("Header__Entrance--open");
        item.style.opacity = 1;
      });
    }
  });
}

export { elementPos };
