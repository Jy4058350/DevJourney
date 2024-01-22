import world from "./glsl/world";
import { viewport, gui, iNode, config } from "./helper";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { theme } from "./component/theme";
import menu from "./component/menu";
import { cling } from "./component/clingHeader";
// import { homeNews } from "./component/home-news";
import "./component/scroll-animation";

import { elementPos } from "./component/elementpos";
import { elementPosHome } from "./component/elementposHome";

window.debug = debugmode(0) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = iNode.getElement(config.$.canvas);

  const pageEl = iNode.getElement(config.$.pageContainer);

  const headerEl = iNode.getElement(config.$.header);

  const footerEl = iNode.getElement(config.$.footer);

  const pageType = iNode.getDateSet(pageEl, "page");

  if (window.debug) {
    await gui.init();
  }

  await import(`./page/${pageType}.js`).then(({ default: initHome }) => {
    return initHome({
      world,
      mouse,
      loader,
      viewport,
      scroll,
      elementPos,
      elementPosHome,
      // homeNews,
      theme,
      menu,
      cling,
    });
  });

  viewport.init(canvas, 2000, 10, 4000);

  scroll.initScroller();

  loader.loadDom();

  loader.addProgressAction(function _progressAction(loaded, total) {
    const percent = Math.floor((loaded / total) * 100);
    loader.$.p.innerHTML = `${percent} %`;
    loader.$.b.style.width = `${percent}%`;
  });

  viewport.bindResizeEvents();

  await loader.init();
  theme.init();

  menu.init();
  cling.init(headerEl, footerEl);
 

  // elementPos.executeSequence();

  await world.init(canvas, viewport);

  mouse.init();

  world.render();

  await loader.begin();

  // elementPos.wideRangeGoblin();

  gui.open();
}
