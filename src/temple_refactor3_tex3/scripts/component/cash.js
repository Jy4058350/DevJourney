import { LinearFilter, TextureLoader } from "three";
import { iNode } from "../../../iNode";

const texLoader = new TextureLoader();
const cashes = new Map();
const cash = {
  load,
  texesIs,
  texIs,
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

function texesIs(el) {
  const texes = new Map();
  const data = el.dataset;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;
    const url = data[key];
    const tex = cashes.get(url);

    key = key.replace("-", "");
    texes.set(key, tex);
  }
//   console.log(texes);
  return texes;
}

export default cash;
