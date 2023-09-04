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
  // console.log(els);

  els.forEach((el) => {
    const data = el.dataset;

    // console.log(data);
    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      const url = data[key];
    //   key = key.replace("-", "");
      //   console.log(key);
      //   console.log(url);
      if (!cashes.has(url)) {
        cashes.set(url, null);
        const prms = texIs(url).then((tex) => {
                  cashes.set(url, tex);
                });
                texPrms.push(prms);
      }
    }
    console.log(cashes);
  });

//   const texPrms = [];

//   cashes.forEach((_, url) => {
//     const prms = texIs(url).then((tex) => {
//       cashes.set(url, tex);
//     });
//     texPrms.push(prms);
//   });

  await Promise.all(texPrms);
  console.log(cashes);
}

async function texIs(url) {
  const tex = await texLoader.loadAsync(url);
  tex.magFilter = LinearFilter; //??
  tex.minFilter = LinearFilter; //??
  tex.needsUpdate = false;
  console.log(tex);
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
console.log(texes);
  return texes;
}

export default cash;



