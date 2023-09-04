import { LinearFilter } from "three";
import { iNode } from "../../../iNode";

const cashes = new Map();
const cash = {
  load,
  cashes,
};

function load() {
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
  console.log(cashes);
}

cashes.forEach((_, url) => {
  loading(url);
});

async function loading(url) {
  const tex = await texLoader.loadAsync(url);
  tex.magFilter = LinearFilter;//??
  tex.minFilter = LinearFilter;//??
  tex.needsUpdate = false;
  return tex;
}

export default cash;
