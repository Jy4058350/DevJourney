import { iNode } from "../helper";

const header = {
  calcHeaderHeight,
};

function calcHeaderHeight() {
  const headerHeight = iNode.getElById("Header").offsetHeight;
  // console.log(headerHeight);
  const fvTop = iNode.getElById("fv");
  console.log(headerHeight)
  console.log(fvTop);
  console.log(fvTop.style);
  console.log(fvTop.style.setProperty); 
  // fvTop.style.setProperty("--header-height", `${headerHeight}px`)
  fvTop.style.setProperty("--fv-top", `${headerHeight}px`);
  return headerHeight;
}

export { header };
