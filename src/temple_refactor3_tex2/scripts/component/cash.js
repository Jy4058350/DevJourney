import { LinearFilter } from "three";
import { iNode } from "../../../iNode";
import { TextureLoader } from "three";

const texLoader = new TextureLoader();
const cashes = new Map();
const cash = {
  load,
  cashes,
};

async function load() {
  const els = iNode.qsa("[data-webgl]");
  //   console.log(els);

  els.forEach((el) => {
    const data = el.dataset;
    console.log(data);
    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      const url = data[key];
      key = key.replace("-", "");
      console.log(key);
      console.log(url);
      if (!cashes.has(url)) {
        cashes.set(url, null);
      }
    }
  });

  const texPrms = [];

  cashes.forEach((_, url) => {
   const prms = loadImg(url);
    texPrms.push(prms);
  });
  
  await Promise.all(texPrms);
  console.log(cashes);
  console.log(texPrms);
}

async function loadImg(url) {
  const tex = await texLoader.loadAsync(url);
  tex.magFilter = LinearFilter; //??
  tex.minFilter = LinearFilter; //??
  tex.needsUpdate = false;
  return tex;
}

export default cash;
