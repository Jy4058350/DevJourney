import world from "./glsl/world";
import { viewport, gui, iNode, config, dom } from "./helper";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { theme } from "./component/theme";
import menu from "./component/menu";
import { cling } from "./component/clingHeader";
import "./component/scroll-animation";

window.debug = debugmode(1) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = dom.canvas;
  const pageEl = dom.page;
  const headerEl = dom.header;

  const footerEl = dom.footer;

  const pageType = iNode.getDateSet(pageEl, "page");

  if (window.debug) {
    await gui.init();
  }

  await import(`./page/${pageType}.js`).then(({ default: init }) => {
    return init({
      world,
      mouse,
      loader,
      viewport,
      scroll,
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

  gui.open();
}
