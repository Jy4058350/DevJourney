import { iNode } from "../helper/iNode.js";

const menu = {
  init,
};

const $ = {};

function init() {
  $.container = iNode.qs("#global-container");
  $.btn = iNode.qs(".btn-menu");
  $.inner = iNode.qs(".btn-menu_inner");
  $.wrap = iNode.qsa(".btn-menu_wrap");
  $.bar = iNode.qsa(".btn-menu_bar");
  $.page = iNode.qs("#page-container");

  console.log($.container);
}

export default menu;
