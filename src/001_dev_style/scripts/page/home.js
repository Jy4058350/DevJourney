import { iNode } from "../helper";
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";

export default async function init({
  world,
  mouse,
  loader,
  viewport,
  scroller,
  elementPos,
  elementPosHome,
  homeNews,
  theme,
  menu,
  cling,
}) {
  const header = iNode.getElById("header");
  const fv = iNode.getElById("fv");
  const footer = iNode.getElById("footer");

  const headerHandler = new HeaderHandler(header);
  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);

  domManuipulator.init();
  export const updateHeaderHeight = headerHandler.getHeaderHeight();
  console.log("updateHeaderHeight", updateHeaderHeight);

  // elementPos.init();
  // elementPos.resizeHeaderPos();
  // elementPos.resizingFooterPos();
  // elementPosHome.wideRangeGoblin();

  // await elementPosHome.getHomeNewsHeight();
  // await elementPosHome.setRotationViewportHeight();

  // homeNews.init();
  // homeNews.initEventListenres();
}
