import { iNode } from "../helper";

const elementPos = {
  init,
  resizeHeaderPos,
  resizingFooterPos,
  wideRangeGoblin,
  executeSequence,
  _totalHeight,
  _getScrollContentHeight,
};

const $ = {};

function init() {
  _getHeaderHeight();
  _calcGap();
  _totalHeight();
  _getHtmlHeight();
  // _getScrollContentHeight();
}

function _getHtmlHeight() {
  const html = document.documentElement;
  const t = $.totalHeight;
  html.style.height = `${$.totalHeight}px`;
}

// let scrollContentHeight = 0;
function _getScrollContentHeight() {
  const scrollContent = iNode.qs(".scroll-content");
  // console.log("scrollContent", scrollContent);
  // console.log("scrollContent", scrollContent);
  return new Promise((resolve, reject) => {
    if (!scrollContent) {
      reject("scrollContent is not found");
    }

    const scrollContentHeight = scrollContent.offsetHeight;
    // scrollContentHeight = scrollContent.offsetHeight;
    console.log("scrollContentHeight", scrollContentHeight);
    resolve(scrollContentHeight);
  });
}

async function _totalHeight() {
  try {
    $.fvMainHeight = await _getFvMainHeight();
    $.footerHeight = await _getFooterHeight();

    const scrollContent = iNode.qs(".scroll-content");

    $.totalHeight = $.fvMainHeight + $.footerHeight;
    scrollContent.style.height = `${$.totalHeight}px`;

    // $.scrollContentHeight = await _getScrollContentHeight();

    // scrollContentHeight = await _getScrollContentHeight();
    // console.log("totalHeight", $.totalHeight);

    // $.scrollContentHeight = `${$.totalHeight}px`;
    $.scrollContentHeight = `${$.totalHeight}`;
    // console.log("scrollContentHeight", $.scrollContentHeight);
  } catch (error) {
    console.log("Error", error);
  }
}

function _getFvMainHeight() {
  return new Promise((resolve, reject) => {
    if (!$.fvMain) {
      reject("fvMain is not found");
    }
    $.fvMainHeight = $.fvMain.offsetHeight;
    // console.log($.fvMain);
    // console.log($.fvMainHeight);
    resolve($.fvMainHeight);
  });
}

function _getFooterHeight() {
  return new Promise((resolve, reject) => {
    if (!$.footer) {
      reject("footer is not found");
    }
    $.footerHeight = $.footer.offsetHeight;
    // console.log($.footer);
    // console.log($.footerHeight);
    resolve($.footerHeight);
  });
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
    // console.log(nextFvMainRect.bottom);
    // console.log(nextFooterRect.top);
    const gap = nextFvMainRect.bottom - nextFooterRect.top;
    // console.log(gap);
    iNode.setCssProp("--footer-top", `${gap}`, $.footer);
    resolve();
  });
}

let timerHeaderId = null;

function resizeHeaderPos() {
  window.addEventListener("resize", executeResizeHeaderPos);
  executeResizeHeaderPos();
}

function executeResizeHeaderPos() {
  iNode.setCssProp("--header-height", 0);
  clearTimeout(timerHeaderId);
  timerHeaderId = setTimeout(async () => {
    await executeSequence();
  }, 100);
}
let timerIdFooter = null;

function resizingFooterPos() {
  iNode.setCssProp("--footer-top", 0, $.footer);
  window.addEventListener("resize", () => {
    clearTimeout(timerIdFooter);
    timerIdFooter = setTimeout(() => {}, 100);
  });
}

function _toEm(px, rootfontsize) {
  const emValue = px / rootfontsize;
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

let timerIdWideRangeGoblin = null;
function wideRangeGoblin() {
  window.addEventListener("resize", async () => {
    clearTimeout(timerIdWideRangeGoblin);
    timerIdWideRangeGoblin = setTimeout(async () => {
      // console.log("resize");
      await handleResize();
      await executeSequence();
    }, 100);
  });
  handleResize();

  async function handleResize() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const fv = iNode.getElById("fv");
    const goblin = iNode.qs(".Header__FlexItem--logo");
    const headerNav = iNode.qs(".HorizontalList");
    const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    const headerLogo = iNode.qs(".Header__Icon");
    const headerMainNav = iNode.qs(".Header__MainNav");
    const secondNav = iNode.qs(".Header__secondaryNav");
    const emValue = _toEm(1280, 16);

    const isWideScreen = getWindowWidth() > emValue;
    // await iNode.toggleClass(
    //   goblin,
    //   "Header__FlexItem--increaseSpace",
    //   isWideScreen
    // );

    if (isWideScreen) {
      const nextheaderHeight = iNode.getElById("header").offsetHeight;
      iNode.toggleClass(headerNav, "Header__MainNav--open", true);
      iNode.toggleClass(headerMainNav, "Header__MainNav--open", true);
      iNode.toggleClass(secondNav, "Header__secondaryNav--open", true);
      iNode.setCssProp("--fv-top", nextheaderHeight, fv);
      await iNode.setStyles(headerNav, { opacity: 1 });
      await iNode.setStyles(headerBtn, { display: "none" });
      await iNode.setStyles(headerMainNav, { opacity: 1 });
      await iNode.setStyles(secondNav, { opacity: 1 });
      await iNode.setStyles(headerLogo, { display: "none" });
      await iNode.toggleClass(
        goblin,
        "Header__FlexItem--increaseSpace",
        isWideScreen
      );
    } else {
      iNode.toggleClass(headerNav, "Header__MainNav--open", false);
      iNode.toggleClass(headerMainNav, "Header__MainNav--open", false);
      await iNode.setStyles(headerNav, { opacity: 0 });
      await iNode.setStyles(headerBtn, { display: "block" });
      await iNode.setStyles(headerMainNav, { opacity: 0 });
      await iNode.setStyles(secondNav, { opacity: 0 });
      await iNode.setStyles(headerLogo, { display: "block" });
    }
  }
}

export { elementPos };
