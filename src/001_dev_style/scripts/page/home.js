import { iNode } from "../helper";
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";
import Viewport from "../myclasses/viewport";
import FvHandler from "../myclasses/fv";

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
  const referenceView = iNode.qs(".home-news-article-thumbnail");

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);
  const fvHandler = new FvHandler(fv);
  const newsViewport = new Viewport(rotationViewPort, referenceView);

  domManuipulator.init();
  const headerHeight = headerHandler.getHeaderHeight();
  domManuipulator.updateStyle(headerHeight);
  const portHeight = newsViewport.getPort();
  newsViewport.setViewPort(portHeight);

  let resizeTimer;

  window.addEventListener("resize", {
    handleEvent(event) {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        let height = 0;
        domManuipulator.init();
        const headerHeight = headerHandler.getHeaderHeight();
        console.log("resize_headerHeight", headerHeight);
        domManuipulator.updateStyle(headerHeight);
        height = headerHandler.getHeaderHeight();
        console.log("resize_headerHeight", height);
        headerHandler.setElHeight(height);

        fvHandler.raiseFv(height);
        const portHeight = newsViewport.getPort();
        newsViewport.setViewPort(portHeight);
      }, 200);
    },
  });

  // elementPos.init();
  // elementPos.resizeHeaderPos();
  // elementPos.resizingFooterPos();
  // elementPosHome.wideRangeGoblin();

  // await elementPosHome.getHomeNewsHeight();
  // await elementPosHome.setRotationViewportHeight();

  // homeNews.init();
  // homeNews.initEventListenres();
}
