import { iNode } from "../helper";

export function getMenuItem() {
  const container = getGlobalContainer();
  const page = getPageContainer();
  const btn = iNode.qsa(".btn-menu");
  const inner = iNode.qs(".btn-menu_inner");
  const wraps = iNode.qsa(".btn-menu_wrap");
  const bars = iNode.qsa(".btn-menu_bar");
  // getHeader();
  console.log(footer);
  getHeaderChild(header);
  return {
    btn,
    inner,
    wraps,
    bars,
    container,
    page,
  };
}

export function getGlobalContainer() {
  const container = iNode.qs("#globalContainer");
  console.log(container);
  return container;
}

export function getPageContainer() {
  const page = iNode.qs("#pageContainer");
  console.log(page);
  return page;
}

export function getHeader() {
  const header = iNode.qs("#header");
  return header;
}

export function getHeaderChild(header) {
  // const header = getHeader();
  const childEls = iNode.getChildEls(header);
  console.log(...childEls);
}
