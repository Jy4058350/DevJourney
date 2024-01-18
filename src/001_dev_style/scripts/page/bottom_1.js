import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";

import { iNode } from "../helper";

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

  domManuipulator.init();
 
  const headerHeight = headerHandler.getHeaderHeight();

  domManuipulator.updateStyle(headerHeight);
  // const portHeight = newsViewport.getPort();
  // newsViewport.setViewPort(portHeight);

}
