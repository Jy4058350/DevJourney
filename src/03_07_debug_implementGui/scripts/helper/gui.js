import GUI from "lil-gui";
import world from "../glsl/world";

const gui = {
  init,
  ga,
  open,
};

let g = null;

async function init(cb) {
  if (!window.debug) return;
  g = new GUI();
}

function ga(cb) {
  cb(g);
}

function open() {
  gui.ga((g) => {
    world.os.forEach((o) => {
      if (!o.debug) return;
      const t = o.$.el.dataset.webgl;
      const f = g.addFolder(t);
      o.debug(f);
    });
  });
}

export { gui };
