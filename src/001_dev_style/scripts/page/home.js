import { iNode } from "../helper";
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";
import Viewport from "../myclasses/viewport";

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
  const rotationViewPort = iNode.qs(".rotation-viewport");
  console.log("rotationViewPort", rotationViewPort);
  const homeNewsViewPort = iNode.qs(".home-news-article-thumbnail");

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);
  const newsViewport = new Viewport(rotationViewPort,homeNewsViewPort);

  const headerHeight = headerHandler.getHeaderHeight();
  domManuipulator.updateHeaderHeight(headerHeight);
  const newsViewPortheight = newsViewport.getHomeNewsHeight();
  newsViewport.setViewPort(newsViewPortheight);

  // elementPos.init();
  // elementPos.resizeHeaderPos();
  // elementPos.resizingFooterPos();
  // elementPosHome.wideRangeGoblin();

  // await elementPosHome.getHomeNewsHeight();
  // await elementPosHome.setRotationViewportHeight();

  // homeNews.init();
  // homeNews.initEventListenres();
}
