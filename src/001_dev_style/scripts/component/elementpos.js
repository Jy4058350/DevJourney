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
  _getFvMainHeight();
  _getFooterHeight();
  _getHtmlHeight();
  // _totalHeight();
}

function _getHtmlHeight() {
  $.html = document.documentElement;
  console.log($.html);
  $.fullHeight = document.documentElement.scrollHeight;
  console.log($.fullHeight);
  console.log("fullHeight", $.fullHeight);
  console.log($.html.style.height);
  // $.html.style.height = `${$.totalHeight}px`;
  // console.log($.html.style.height);
}

function _totalHeight() {
  $.totalHeight = $.fvMainHeight + $.footerHeight;

  console.log("totalHeight", $.totalHeight);
  console.log("fullHeight", $.fullHeight);
}

function _getFvMainHeight() {
  $.fvMainHeight = $.fvMain.offsetHeight;
  console.log($.fvMain);
  console.log($.fvMainHeight);
}

function _getFooterHeight() {
  $.footerHeight = $.footer.offsetHeight;
  console.log($.footer);
  console.log($.footerHeight);
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
    iNode.toggleClass(goblin, "Header__FlexItem--increaseSpace", isWideScreen);

    if (isWideScreen) {
      const nextheaderHeight = iNode.getElById("header").offsetHeight;
      iNode.toggleClass(headerNav, "Header__MainNav--open", true);
      iNode.toggleClass(headerMainNav, "Header__MainNav--open", true);
      iNode.toggleClass(secondNav, "Header__secondaryNav--open", true);
      iNode.setCssProp("--fv-top", nextheaderHeight, fv);
      iNode.setStyles(headerNav, { opacity: 1 });
      iNode.setStyles(headerBtn, { display: "none" });
      iNode.setStyles(headerMainNav, { opacity: 1 });
      iNode.setStyles(secondNav, { opacity: 1 });
      iNode.setStyles(headerLogo, { display: "none" });
    } else {
      iNode.toggleClass(headerNav, "Header__MainNav--open", false);
      iNode.toggleClass(headerMainNav, "Header__MainNav--open", false);
      iNode.setStyles(headerNav, { opacity: 0 });
      iNode.setStyles(headerBtn, { display: "block" });
      iNode.setStyles(headerMainNav, { opacity: 0 });
      iNode.setStyles(secondNav, { opacity: 0 });
      iNode.setStyles(headerLogo, { display: "block" });
    }
  }
}

export { elementPos };
