import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { gui } from "./helper/gui";
import menu from "./component/menu";
import "./component/scroll-animation";

import { header } from "./component/header";

window.debug = debugmode(0) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  if (window.debug) {
    await gui.init();
  }

  header.calcHeaderHeight();
  // header.test();

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

  menu.init();

  await world.init(canvasRect, viewport);

  mouse.init();

  world.render();

  loader.loadingAnimation();

  // setTimeout(() => {
  //   let dispose;
  //   const client = world.getOs(`[data-webgl="03noise-slide"]`);
  //   gsap.to(client.uniforms.uProgress, {
  //     value: 1,
  //     duration: 1.0,
  //     ease: "none",
  //     // repeat: -1,
  //     yoyo: true,
  //     onComplete: () => {
  //       world.removeMesh(client, (dispose = true));
  //     },
  //   });
  // }, 6000);

  gui.open();
}
