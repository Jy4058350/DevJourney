import { LinearFilter, TextureLoader } from "three";
import { iNode } from "../../../iNode";

import { texesIs } from "./texes";

const texLoader = new TextureLoader();
const cashes = new Map();
const cash = {
  load,
  texIs,
  cashes,
};

async function load() {
  const els = iNode.qsa("[data-webgl]");
  const texPrms = [];

  els.forEach((el) => {
    const data = el.dataset;

    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      const url = data[key];
      if (!cashes.has(url)) {
        cashes.set(url, null);
      }
    }
  });

  cashes.forEach((_, url) => {
    const prms = texIs(url).then((tex) => {
      cashes.set(url, tex);
    });
    texPrms.push(prms);
  });

  await Promise.all(texPrms);
}

async function texIs(url) {
  const tex = await texLoader.loadAsync(url);
  tex.magFilter = LinearFilter; //??
  tex.minFilter = LinearFilter; //??
  tex.needsUpdate = false;
  return tex;
}

async function texIs(url) {
  const tex = await texLoader.loadAsync(url);
  tex.magFilter = LinearFilter; //??
  tex.minFilter = LinearFilter; //??
  tex.needsUpdate = false;
  return tex;
}

export default cash;
