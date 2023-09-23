import "../styles/style.scss";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { gui } from "./helper/gui";
import { AxesHelper } from "three";

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

  loader.loadingAnimation();

  gui.open();

  function orbitGo() {
    import("three/examples/jsm/controls/OrbitControls")
      .then((module) => {
        const { OrbitControls } = module;

        const controls = new OrbitControls(
          world.camera,
          world.renderer.domElement
        );
        controls.enableDamping = true;
        const axis = new AxesHelper(100);
        world.scene.add(axis);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  orbitGo();
}
