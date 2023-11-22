import { iNode } from "../helper";

const elementPos = {
  init,
  raiseFv,
  calcFooterPos,
  resizingCalcFooterPos,
  headerIncreaseSpaceToggle,
};

const $ = {};
_asyncCalcHeaderHeight().then(() => {
  raiseFv();
  console.log($.headerHeight);
});

function init() {
  $.headerHeight = _getHeaderHeight();
  iNode.setCssProp("--header-height", $.headerHeight);

  $.announcementHeight = iNode.getElById("section-announcement").offsetHeight;

  $.fvMain = iNode.getElById("fv-main");
  $.footer = iNode.getElById("footer");

  $.footerHeight = $.footer.offsetHeight;
  $.fvMainRect = $.fvMain.getBoundingClientRect();
  $.fvMainAbsoluteBottom = $.fvMainRect.bottom;

  $.footerRect = $.footer.getBoundingClientRect();
  $.footerAbsoluteTop = $.footerRect.top;

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;
}

function _getHeaderHeight() {
  $.headerHeight = iNode.getElById("header").offsetHeight;
  console.log($.headerHeight);
  return $.headerHeight;
}

function _asyncCalcHeaderHeight() {
  return new Promise((resolve) => {
    _getHeaderHeight();
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

function raiseFv() {
  $.fv = iNode.getElById("fv");
  iNode.setCssProp("--fv-top", $.headerHeight);
}

// function raiseFv() {
//   return new Promise((resolve) => {
//     $.fv = iNode.getElById("fv");
//     iNode.setCssProp("--fv-top", $.headerHeight);
//     setTimeout(() => {
//       resolve();
//     }, 500);
//   });
// }

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
    const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    // const headerLogo = iNode.qs(".Header__Logo1");
    const headerLogo = iNode.qs(".Header__Icon");
    const headerMainNav = iNode.qs(".Header__MainNav");
    const secondNav = iNode.qs(".Header__secondaryNav");
    // console.log(headerBtn);
    const emValue = _toEm(1280, 16);
    if (getWindowWidth() > emValue) {
      increaseSpace.classList.add("Header__FlexItem--increaseSpace");
      const nextheaderHeight = iNode.getElById("header").offsetHeight;
      $.fv.style.setProperty("--fv-top", `${nextheaderHeight}px`);
      // headerNav.classList.add("Header__MainNav--open");
      headerNav.style.opacity = 1;

      headerBtn.classList.add("Header__Entrance--open");
      headerBtn.style.display = "none";
      headerLogo.classList.add("Header__EntranceLogo--open");
      console.log(headerMainNav);
      headerMainNav.style.opacity = 1;
      secondNav.style.opacity = 1;
    } else {
      increaseSpace.classList.remove("Header__FlexItem--increaseSpace");
      // headerNav.classList.remove("Header__MainNav--open");
      headerNav.style.opacity = 0;
      headerBtn.classList.remove("Header__Entrance--open");
      headerBtn.style.display = "block";
      headerLogo.classList.remove("Header__EntranceLogo--open");
      console.log(increaseSpace);
      headerMainNav.style.opacity = 0;
      secondNav.style.opacity = 0;
    }
  });
}

export { elementPos };
