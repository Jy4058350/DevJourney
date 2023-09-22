import GUI from "lil-gui";

const gui = {
  init,
  ga,
};

let g = null;

async function init(cb) {
  if (!window.debug) return;
  g = new GUI();
}

function ga(cb) {
  cb(g);
}

export { gui };

// const folder1 = g.addFolder("action");
