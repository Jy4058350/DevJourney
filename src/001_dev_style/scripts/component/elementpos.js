import { iNode } from "../helper";

const elementPos = {
  init,
  resizeHeaderPos,
  resizingFooterPos,
  wideRangeGoblin,
  executeSequence,
};

const $ = {};

function init() {
  _getHeaderHeight();
  _calcGap();
}

function _calcGap() {
  $.fvMain = iNode.getElById("fv-main");
  $.footer = iNode.getElById("footer");

  $.fvMainRect = $.fvMain.getBoundingClientRect();
  $.fvMainAbsoluteBottom = $.fvMainRect.bottom;

  $.footerRect = $.footer.getBoundingClientRect();
  $.footerAbsoluteTop = $.footerRect.top;

  $.footerHeight = $.footer.offsetHeight;

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;
}

function _getHeaderHeight() {
  return new Promise((resolve) => {
    const headerEl = iNode.getElById("header");
    const headerHeight = headerEl.offsetHeight;
    iNode.setCssProp("--header-height", headerHeight);
    resolve(headerHeight);
  });
}

function raiseFv(headerHeight) {
  return new Promise((resolve) => {
    const fv = iNode.getElById("fv");
    iNode.setCssProp("--fv-top", headerHeight);
    resolve();
  });
}

async function executeSequence() {
  try {
    const headerHeight = await _getHeaderHeight();
    await raiseFv(headerHeight);
    await _calcGapFooterPos();
  } catch (err) {
    console.log("error", err);
  }
  // console.log("End sequence");
}

function _calcGapFooterPos() {
  return new Promise((resolve) => {
    iNode.setCssProp("--footer-top", 0, $.footer);
    const nextFvMainRect = $.fvMain.getBoundingClientRect();
    const nextFooterRect = $.footer.getBoundingClientRect();
    console.log(nextFvMainRect.bottom);
    console.log(nextFooterRect.top);
    const gap = nextFvMainRect.bottom - nextFooterRect.top;
    console.log(gap);
    iNode.setCssProp("--footer-top", `${gap}`, $.footer);
    resolve();
  });
}

let timerHeaderId = null;
let timerIdFooter = null;

function resizeHeaderPos() {
  window.addEventListener("resize", () => {
    // console.log("Resize event triggered");
    iNode.setCssProp("--header-height", 0);
    clearTimeout(timerHeaderId);
    timerHeaderId = setTimeout(async () => {
      // _getHeaderHeight();
      await executeSequence();
    }, 100);
  });
}

function resizingFooterPos() {
  iNode.setCssProp("--footer-top", 0, $.footer);
  window.addEventListener("resize", () => {
    clearTimeout(timerIdFooter);
    timerIdFooter = setTimeout(() => {
      // _calcGapFooterPos();
    }, 100);
  });
}

function _toEm(px, rootfontsize) {
  const emValue = px / rootfontsize;
  // console.log(emValue);
  // console.log(window.innerWidth);
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

function wideRangeGoblin() {
  // window.addEventListener("resize", () => {
  window.addEventListener("resize", handleResize);

  function handleResize() {
    const fv = iNode.getElById("fv");
    const goblin = iNode.qs(".Header__FlexItem--logo");
    const headerNav = iNode.qs(".HorizontalList");
    const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    const headerLogo = iNode.qs(".Header__Icon");
    const headerMainNav = iNode.qs(".Header__MainNav");
    const secondNav = iNode.qs(".Header__secondaryNav");
    const emValue = _toEm(1280, 16);

    const isWideScreen = getWindowWidth() > emValue;
    goblin.classList.toggle("Header__FlexItem--increaseSpace", isWideScreen);

    if (isWideScreen) {
      const nextheaderHeight = iNode.getElById("header").offsetHeight;
      iNode.setCssProp("--fv-top", nextheaderHeight, fv);
      headerNav.classList.add("Header__MainNav--open");
      headerNav.style.opacity = 1;
      headerBtn.classList.add("Header__Entrance--open");
      headerBtn.style.display = "none";
      headerLogo.classList.add("Header__EntranceLogo--open");
      headerMainNav.style.opacity = 1;
      secondNav.style.opacity = 1;
    } else {
      headerNav.style.opacity = 0;
      headerBtn.classList.remove("Header__Entrance--open");
      headerBtn.style.display = "block";
      headerLogo.classList.remove("Header__EntranceLogo--open");
      headerMainNav.style.opacity = 0;
      secondNav.style.opacity = 0;
    }
  }
}

export { elementPos };
