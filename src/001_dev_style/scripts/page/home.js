import { iNode } from "../helper";
import DOMManuipulatorClass from "../myclasses/domManuipulator";
import HeaderHandler from "../myclasses/header";
import Viewport from "../myclasses/viewport";
import FvHandler from "../myclasses/fv";
import HomeNews from "../myclasses/homeNews";

export default async function init({
  world,
  mouse,
  loader,
  viewport,
  scroller,
  elementPos,
  elementPosHome,
  // homeNews,
  theme,
  menu,
  cling,
}) {
  const header = iNode.getElById("header");
  const fv = iNode.getElById("fv");
  const footer = iNode.getElById("footer");
  const rotationViewPort = iNode.qs(".rotation-viewport");
  const referenceView = iNode.qs(".home-news-article-thumbnail");
  const sliders = iNode.qs(".rotation-slider");
  const prevButton = iNode.qs(".home-news-control-button.Previous");
  const nextButton = iNode.qs(".home-news-control-button.Next");

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);
  const fvHandler = new FvHandler(fv);
  const newsViewport = new Viewport(rotationViewPort, referenceView);
  const homeNews = new HomeNews(sliders, prevButton, nextButton);

  domManuipulator.init();
  homeNews.start();

  const portHeight = newsViewport.getPort();
  newsViewport.setViewPort(portHeight);

  // let resizeTimer;

  // window.addEventListener("resize", {
  //   handleEvent(event) {
  //     clearTimeout(resizeTimer);

  //     resizeTimer = setTimeout(() => {
  //       let height = 0;
  //       domManuipulator.init();
  //       const headerHeight = domManuipulator.getHeaderHeight();
  //       console.log("resize_headerHeight before update", headerHeight);
  //       domManuipulator.updateStyle(headerHeight);
  //       height = domManuipulator.getHeaderHeight();
  //       console.log("resize_headerHeight after update", height);
  //       domManuipulator.setElHeight(height);

  //       fvHandler.raiseFv(height);
  //       const portHeight = newsViewport.getPort();
  //       newsViewport.setViewPort(portHeight);
  //     }, 200);
  //   },
  // });
}
