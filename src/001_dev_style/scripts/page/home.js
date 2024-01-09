import { elementPosHome } from "../component/elementposHome";

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
  elementPos.init();
  elementPos.resizeHeaderPos();
  elementPos.resizingFooterPos();
  // await elementPos.handleResize();

  await elementPosHome.setRotationViewportHeight();
  await elementPosHome.getHomeNewsHeight();
  elementPosHome.wideRangeGoblin();

  homeNews.init();
  homeNews.initEventListenres();

  cling.init();
  cling._clingTo();
}
