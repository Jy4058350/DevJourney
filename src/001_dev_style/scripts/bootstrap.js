import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { theme } from "./component/theme";
import { gui } from "./helper/gui";
import menu from "./component/menu";
import cling from "./component/cling";
import { homeNews } from "./component/home-news";
import "./component/scroll-animation";
import { iNode } from "./helper";

import { elementPos } from "./component/elementpos";

window.debug = debugmode(0) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  const pageEl = iNode.getElement("#pageContainer");
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
      homeNews,
      theme,
      menu,
      cling,
    });
  });

  viewport.init(canvasRect);

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
  cling.init();
  cling._clingTo();

  elementPos.executeSequence();

  await world.init(canvasRect, viewport);

  mouse.init();

  world.render();

  await loader.begin();

  elementPos.wideRangeGoblin();

  gui.open();
}
