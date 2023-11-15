import { iNode } from "../helper";

const elementPos = {
  init,
  calcHeaderHeight,
};

const $ = {};

function init() {
  $.headerHeight = iNode.getElById("Header").offsetHeight;
  $.fvTop = iNode.getElById("fv");
}

function calcHeaderHeight() {
  // const fvTop = iNode.getElById("fv");
  // fvTop.style.setProperty("--fv-top", `${$.headerHeight}px`);
  $.fvTop.style.setProperty("--fv-top", `${$.headerHeight}px`);
  return $.headerHeight;
}

export { elementPos };
