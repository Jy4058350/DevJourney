import GUI from "lil-gui";
import world from "../glsl/world";

const gui = {
  init,
  ga,
  guiOpen,
};

let g = null;

async function init(cb) {
  if (!window.debug) return;
  g = new GUI();
  console.log(g);
}

function ga(cb) {
  cb(g);
}

function guiOpen() {
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

// const folder1 = g.addFolder("action");
