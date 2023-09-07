import { LinearFilter, TextureLoader } from "three";
import { iNode } from "../../../iNode";

import { texesIs } from "./texes";

const texLoader = new TextureLoader();
const cashes = new Map();
const cash = {
  load,
  texIs,
  cashes,
  clientProgressAction,
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

let totalNum = 0;
let countNum = 0;

async function texIs(url) {
  totalNumIs();
  // console.log(totalNum);
  const tex = await texLoader.loadAsync(url);
  countNumIs();
  // console.log(countNum);
  tex.magFilter = LinearFilter; //??
  tex.minFilter = LinearFilter; //??
  tex.needsUpdate = false;
  return tex;
}

function totalNumIs() {
  totalNum++;
}

function countNumIs() {
  countNum++;
}

function clientProgressAction() {
  const progress = countNum / totalNum;
  console.log(progress);

  const loaderPersent = iNode.qs(".loader-persent");
  console.log(loaderPersent);
  loaderPersent.innerHTML = Math.floor(progress * 100) + "%";
}

export default cash;
