export default async function init({
  world,
  mouse,
  loader,
  viewport,
  scroller,
  elementPos,
  homeNews,
  theme,
  menu,
  cling,
}) {
  elementPos.resizeHeaderPos();
  elementPos.resizingFooterPos();
  elementPosHome.wideRangeGoblin();
  // elementPosHome.handleResize();
}
