import { debounce } from "lodash";
import { iNode } from "../helper";
import { elementPos } from "./elementpos";
import exp from "constants";

const $ = {};

const elementPosHome = {
  setRotationViewportHeight,
  getHomeNewsHeight,
  wideRangeGoblin,
  handleResize,
};

function _toEm(px, rootfontsize) {
  const emValue = px / rootfontsize;
  return emValue;
}

async function setRotationViewportHeight() {
  $.rotationViewport = iNode.qs(".rotation-viewport");
  const homeNewsHeight = await elementPos.getHomeNewsHeight();

  $.rotationViewport.style.height = iNode.setHeightPx(
    $.rotationViewport,
    homeNewsHeight
  );
}

async function getHomeNewsHeight() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  $.adjustHomeNewsElHeight = iNode.qs(".home-news-article-thumbnail");
  const homeNewsHeight = $.adjustHomeNewsElHeight.offsetHeight;
  return homeNewsHeight;
}

let timerIdWideRangeGoblin = null;
// Code for home.js only
function wideRangeGoblin() {
  window.addEventListener("resize", debounce(resizeHandler, 100));
  handleResize(); //initial call
}

function resizeHandler() {
  clearTimeout(timerIdWideRangeGoblin);
  timerIdWideRangeGoblin = setTimeout(async () => {
    await elementPos.executeSequence();
    await handleResize();
    await setRotationViewportHeight();
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

  const isWideScreen = elementPos.getWindowWidth() > emValue;

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

// export { setRotationViewportHeight, getHomeNewsHeight, wideRangeGoblin };
export { elementPosHome };
