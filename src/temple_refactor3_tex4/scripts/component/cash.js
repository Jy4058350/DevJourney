import { LinearFilter, TextureLoader } from "three";
import { iNode } from "../../../iNode";

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
let _progressAction = null;

async function texIs(url) {
  totalNumIs();

  const tex = await texLoader.loadAsync(url);
  countNumIs();
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
  if (_progressAction) {
    _progressAction(countNum, totalNum);
  }
}

function clientProgressAction(_callback) {
  _progressAction = _callback;
}

// function progressAction() {
//   const progressBar = iNode.qs(".progress-bar");
//   progressBar.value = Math.floor((countNum / totalNum) * 100);
//   const loaderPersent = iNode.qs(".loader-persent");
//   loaderPersent.innerHTML = Math.floor((countNum / totalNum) * 100) + "%";
// }



export default cash;
