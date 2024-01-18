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
    elementPos.resizeHeaderPos();
    elementPos.resizingFooterPos();
    elementPosHome.wideRangeGoblin();
    
  }
  