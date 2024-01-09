import { debounce } from "lodash";
import { iNode } from "../helper";

const elementPos = {
  init,
  resizeHeaderPos,
  resizingFooterPos,
  wideRangeGoblin,
  executeSequence,
  // totalHeight,
  // _getScrollContentHeight,
  handleResize,
};

const $ = {};

function init() {
  _calcGap();
  _setRotationViewportHeight();
}

async function _getElementHeight(el, errormsg) {
  return new Promise((resolve, reject) => {
    if (!el) {
      reject(errormsg);
    }
    resolve(el.offsetHeight);
  });
}

function _calcGap() {
  $.fv = iNode.getElById("fv");
  $.footer = iNode.getElById("footer");

  const fvRect = $.fv.getBoundingClientRect();
  $.fvMainAbsoluteBottom = fvRect.bottom;

  const footerRect = $.footer.getBoundingClientRect();
  $.footerAbsoluteTop = footerRect.top;

  $.footerHeight = $.footer.offsetHeight;

  $.gap = $.fvMainAbsoluteBottom - $.footerAbsoluteTop - $.headerHeight;
}

// ⭐️need to be refactored
async function _getHeaderHeight() {
  return new Promise((resolve) => {
    const headerEl = iNode.getElById("header");
    const headerHeight = headerEl.offsetHeight;
    iNode.setCssProp("--header-height", headerHeight);
    resolve(headerHeight);
  });
}

// Code for home.js only
async function _setRotationViewportHeight() {
  $.rotationViewport = iNode.qs(".rotation-viewport");
  const homeNewsHeight = await _getHomeNewsHeight();

  $.rotationViewport.style.height = `${homeNewsHeight}px`;
  // $.rotationViewport.style.height = iNode.setHeightPx(
  //   $.rotationViewport,
  //   homeNewsHeight
  // );
  console.log("test", $.rotationViewport.style.height);
}
// Code for home.js only
async function _getHomeNewsHeight() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  $.homeNewsArticeThumbnail = iNode.qs(".home-news-article-thumbnail");
  const thumbnailHeight = $.homeNewsArticeThumbnail.offsetHeight;
  return thumbnailHeight;
}

async function executeSequence() {
  try {
    const headerHeight = await _getHeaderHeight();
    await _raiseFv(headerHeight);
    await _calcGapFooterPos();
  } catch (err) {
    console.log("error", err);
  }
  // console.log("End sequence");
}

function _raiseFv(headerHeight) {
  return new Promise((resolve) => {
    const fv = iNode.getElById("fv");
    iNode.setCssProp("--fv-top", headerHeight);
    resolve();
  });
}

function _calcGapFooterPos() {
  return new Promise((resolve) => {
    iNode.setCssProp("--footer-top", 0, $.footer);
    const nextFvMainRect = $.fv.getBoundingClientRect();
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

function _getWindowWidth(rootfontsize = 16) {
  return (
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) / rootfontsize
  );
}

let timerIdWideRangeGoblin = null;

function wideRangeGoblin() {
  window.addEventListener("resize", debounce(resizeHandler, 100));
  handleResize(); //initial call
}

function resizeHandler() {
  clearTimeout(timerIdWideRangeGoblin);
  timerIdWideRangeGoblin = setTimeout(async () => {
    await executeSequence();
    await handleResize();
    await _setRotationViewportHeight();
  }, 100);
}

async function handleResize() {
  // console.log("handleResize");
  await new Promise((resolve) => setTimeout(resolve, 100));

  const fv = iNode.getElById("fv");
  const Header = iNode.getElById("header");
  const header = iNode.qs("header");
  const goblin = iNode.qs(".Header__FlexItem--logo");
  const headerNav = iNode.qs(".HorizontalList");
  const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
  const headerLogo = iNode.qs(".Header__Icon");
  const headerMainNav = iNode.qs(".Header__MainNav");
  const secondNav = iNode.qs(".Header__secondaryNav");
  const emValue = _toEm(1280, 16);

  const isWideScreen = _getWindowWidth() > emValue;

  if (isWideScreen) {
    // const nextheaderHeight = Header.offsetHeight;
    const nextheaderHeight = await _getHeaderHeight();
    // console.log("Header", Header);
    // console.log("isWideScreen_nextheaderHeight", nextheaderHeight);
    iNode.toggleClass(headerNav, "Header__MainNav--open", true);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", true);
    iNode.toggleClass(secondNav, "Header__secondaryNav--open", true);
    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    await iNode.setStyles(Header, { height: "145px", maxHeight: "145px" });
    // await iNode.setStyles(Header, { height: "145px" });
    await iNode.setStyles(header, { height: "145px", maxHeight: "145px" });
    // await iNode.setStyles(header, { height: "145px" });
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
  } else if (!isWideScreen) {
    const nextheaderHeight = await _getHeaderHeight();
    // const nextheaderHeight = iNode.getElById("header").offsetHeight;
    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    iNode.toggleClass(headerNav, "Header__MainNav--open", false);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", false);
    await iNode.setStyles(Header, { height: "68px", maxHeight: "68px" });
    // await iNode.setStyles(header, { height: "68px" });
    await iNode.setStyles(Header, { height: "68px", maxHeight: "68px" });
    // await iNode.setStyles(header, { height: "68px" });
    await iNode.setStyles(headerNav, { opacity: 0 });
    await iNode.setStyles(headerBtn, { display: "block" });
    await iNode.setStyles(headerMainNav, { opacity: 0 });
    await iNode.setStyles(secondNav, { opacity: 0 });
    await iNode.setStyles(headerLogo, { display: "block" });
    await iNode.toggleClass(
      goblin,
      "Header__FlexItem--increaseSpace",
      isWideScreen
    );
  }
}

export { elementPos };
