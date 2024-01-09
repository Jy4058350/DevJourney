import { debounce, set } from "lodash";
import { iNode } from "../helper";
import { setRotationViewportHeight } from "./elementposHome";

const elementPos = {
  init,
  getHomeNewsHeight,
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
  // _setRotationViewportHeight();
}

await setRotationViewportHeight();
// Code for home.js only
// async function _setRotationViewportHeight() {
//   $.rotationViewport = iNode.qs(".rotation-viewport");
//   const homeNewsHeight = await _getHomeNewsHeight();

//   $.rotationViewport.style.height = iNode.setHeightPx(
//     $.rotationViewport,
//     homeNewsHeight
//   );
// }
// Code for home.js only
async function getHomeNewsHeight() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  $.adjustHomeNewsElHeight = iNode.qs(".home-news-article-thumbnail");
  const homeNewsHeight = $.adjustHomeNewsElHeight.offsetHeight;
  return homeNewsHeight;
}

async function executeSequence() {
  try {
    const headerHeight = await iNode.getElementHeight(
      iNode.getElById("header"),
      "Header element is not found"
    );
    await _raiseFv(headerHeight);
    await _calcGapFooterPos();
  } catch (err) {
    console.log("error", err);
  }
}

// if #fv is uesed in other pages, use this function
function _raiseFv(headerHeight) {
  return new Promise((resolve) => {
    const fv = iNode.getElById("fv");
    iNode.setCssProp("--fv-top", headerHeight);
    resolve();
  });
}

// if #fv is uesed in other pages, use this function
function _calcGapFooterPos() {
  $.fv = iNode.getElById("fv");
  $.footer = iNode.getElById("footer");
  return new Promise((resolve) => {
    iNode.setCssProp("--footer-top", 0, $.footer);
    const nextFvMainRect = $.fv.getBoundingClientRect();
    const nextFooterRect = $.footer.getBoundingClientRect();
    const gap = nextFvMainRect.bottom - nextFooterRect.top;
    iNode.setCssProp("--footer-top", `${gap}`, $.footer);
    resolve();
  });
}

// Mabye common function
function resizeHeaderPos() {
  window.addEventListener("resize", executeResizeHeaderPos);
  executeResizeHeaderPos();
}
let timerHeaderId = null;

function executeResizeHeaderPos() {
  iNode.setCssProp("--header-height", 0);
  clearTimeout(timerHeaderId);
  timerHeaderId = setTimeout(async () => {
    await executeSequence();
  }, 100);
}
// Mabye common function
let timerIdFooter = null;

function resizingFooterPos() {
  iNode.setCssProp("--footer-top", 0, $.footer);
  window.addEventListener("resize", () => {
    clearTimeout(timerIdFooter);
    timerIdFooter = setTimeout(() => {}, 100);
  });
}

// Mabye common function
function _toEm(px, rootfontsize) {
  const emValue = px / rootfontsize;
  return emValue;
}

// Mabye common function
function _getWindowWidth(rootfontsize = 16) {
  return (
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) / rootfontsize
  );
}

let timerIdWideRangeGoblin = null;

// Code for home.js only
function wideRangeGoblin() {
  window.addEventListener("resize", debounce(resizeHandler, 100));
  handleResize(); //initial call
}

// Code for home.js only
function resizeHandler() {
  clearTimeout(timerIdWideRangeGoblin);
  timerIdWideRangeGoblin = setTimeout(async () => {
    await executeSequence();
    await handleResize();
    await _setRotationViewportHeight();
  }, 100);
}

// Code for home.js only
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
    const nextheaderHeight = await iNode.getElementHeight(
      Header,
      "Header element is not found"
    );
    iNode.toggleClass(headerNav, "Header__MainNav--open", true);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", true);
    iNode.toggleClass(secondNav, "Header__secondaryNav--open", true);
    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    await iNode.setStyles(Header, { height: "145px", maxHeight: "145px" });
    await iNode.setStyles(header, { height: "145px", maxHeight: "145px" });
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
    const nextheaderHeight = await iNode.getElementHeight(
      Header,
      "Header element is not found"
    );
    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    iNode.toggleClass(headerNav, "Header__MainNav--open", false);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", false);
    await iNode.setStyles(Header, { height: "68px", maxHeight: "68px" });
    await iNode.setStyles(Header, { height: "68px", maxHeight: "68px" });
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
