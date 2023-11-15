import { iNode } from "../helper";

const elementPos = {
  init,
  calcHeaderHeight,
};

const $ = {};

function init() {
  $.headerHeight = iNode.getElById("header").offsetHeight;
  $.fvTop = iNode.getElById("fv");
  // $. = iNode.getElById("element");
}

function calcHeaderHeight() {
  $.fvTop.style.setProperty("--fv-top", `${$.headerHeight}px`);
  return $.headerHeight;
}

export { elementPos };
