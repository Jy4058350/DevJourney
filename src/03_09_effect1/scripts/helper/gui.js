import GUI from "lil-gui";
import world from "../glsl/world";
import { orbit } from "./orbit";
import { AxesHelper } from "three";

const gui = {
  init,
  ga,
  open,
};

let g = null;

async function init() {
  if (!window.debug) return;
  g = new GUI();
}

function ga(cb) {
  cb(g);
}

let isActive = { value: false };
function open() {
  if (!window.debug) return;

  g.addFolder("Orbit")
    .add(isActive, "value")
    .name("active")
    .onChange(() => {
      if (isActive.value) {
        orbit.Run();
        console.log("1");
      } else {
        AxesHelper.visible = false;
        AxesHelper.visible = false;
        orbit.Stop();
        console.log("2");
      }
    });

  ga((g) => {
    world.os.forEach((o) => {
      if (!o.debug) return;
      const type = o.$.el.dataset.webgl;
      const newGui = g.addFolder(type);
      o.debug(newGui);
      // g.close();
    });
  });
}

export { gui };
