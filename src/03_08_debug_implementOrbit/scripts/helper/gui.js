import GUI from "lil-gui";
import world from "../glsl/world";

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

function open() {
  if (!window.debug) return;
  ga((g) => {
    world.os.forEach((o) => {
      if (!o.debug) return;
      const type = o.$.el.dataset.webgl;
      const newGui = g.addFolder(type);
      o.debug(newGui);
        g.close();
    });
  });
}

export { gui };
