import { iNode } from "../helper/iNode.js";

const menu = {
  init,
};

function init() {
  const btn = iNode.qs(".btn-menu");
  const inner = iNode.qs(".btn-menu_inner");
  const wrap = iNode.qsa(".btn-menu_wrap");
  const bar = iNode.qsa(".btn-menu_bar");

console.log(btn, inner, wrap, bar);
}

export default menu;
