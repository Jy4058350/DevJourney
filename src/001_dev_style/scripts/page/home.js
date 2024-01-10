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
  // console.log("init bottom");
  elementPos.init();
  elementPos.resizeHeaderPos();
  elementPos.resizingFooterPos();
  elementPosHome.wideRangeGoblin();

  await elementPosHome.getHomeNewsHeight();
  await elementPosHome.setRotationViewportHeight();

  homeNews.init();
  homeNews.initEventListenres();
}
