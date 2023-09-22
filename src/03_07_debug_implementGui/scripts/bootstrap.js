import "../styles/style.scss";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { gui } from "./helper/gui";

window.debug = debugmode(1) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  if (window.debug) {
    await gui.init();
  }

  viewport.init(canvasRect);

  scroll.initScroller();

  loader.loadDom();

  loader.addProgressAction(function _progressAction(total, loaded) {
    const percent = Math.floor((loaded / total) * 100);
    loader.$.p.innerHTML = `${percent} %`;
    loader.$.b.style.width = `${percent}%`;
  });

  viewport.bindResizeEvents();

  await loader.init();

  await world.init(canvasRect, viewport);

  mouse.init();

  world.render();

  // await gui.guiOpen();

  loader.loadingAnimation();

  gui.guiOpen();
  // gui.ga((g) => {
  //   world.os.forEach((o) => {
  //     if (!o.debug) return;
  //     const t = o.$.el.dataset.webgl;
  //     const f = g.addFolder(t);
  //     o.debug(f);
  //   });
  // });
}
