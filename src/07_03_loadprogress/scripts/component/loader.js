import { TextureLoader } from "three";
import { iNode } from "../helper";

const loader = {
  init,
  load,
  texMap,
};

const texLoader = new TextureLoader();

const box = new Map();

async function init() {
  const els = iNode.qsa("[data-webgl]");
  els.forEach((el) => {
    const data = el.dataset;
    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      if (key.startsWith("tex")) {
        const url = data[key];
        if (!box.has(url)) {
          box.set(url, null);
        }
        // console.log(box);
      }
    }
  });
  const texPrms = [];

  box.forEach((_, url) => {
    const prms = load(url).then((tex) => {
      box.set(url, tex);
    });
    texPrms.push(prms);
    // console.log(texPrms);
  });
  await Promise.all(texPrms);
  // console.log(box);
}

async function load(url) {
  const tex = await texLoader.loadAsync(url);
  return tex;
}

function texMap(el) {
  const texes = new Map();
  const data = el.dataset;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;

    const url = data[key];
    key = key.replace("-", "");
    texes.set(key, box.get(url));
  }
  return texes;
}

export { loader };
