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

  await elementPosHome.getHomeNewsHeight();
  await elementPosHome.setRotationViewportHeight();
  elementPosHome.wideRangeGoblin();

  homeNews.init();
  homeNews.initEventListenres();

  cling.init();
  cling._clingTo();
}
