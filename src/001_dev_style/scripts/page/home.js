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
  elementPos.init();
  elementPos.resizeHeaderPos();
  elementPos.resizingFooterPos();
  elementPos.wideRangeGoblin();
  await elementPos.handleResize();
  await elementPos._totalHeight();

  // homeNews.init();
}
