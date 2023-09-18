import { TextureLoader } from "three";
import { iNode } from "../helper";

const loader = {
  init,
  load,
  texMap,
};

const $ = {};

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
    // increment();

    const prms = load(url).then((tex) => {
      box.set(url, tex);

      // p.innerHTML = `${percent}%`;
      // b.style.width = `${percent}%`;
    });
    texPrms.push(prms);
    // console.log(texPrms);
  });
  await Promise.all(texPrms);
  // console.log(box);
}

let total = 0;
let loaded = 0;
// let _progressAction = null;
$.p = iNode.qs(".percent");
$.b = iNode.qs(".progress-bar");

function incrementTotal() {
  total++;
}

function incrementProgress() {
  loaded++;
  if (_progressAction) {
    _progressAction(loaded, total);
  }
}

function _progressAction(total, loaded) {
  const percent = Math.floor((loaded / total) * 100);
  $.p.innerHTML = `${percent} %`;
  $.b.style.width = `${percent}%`;

}

async function load(url) {
  incrementTotal();
  const tex = await texLoader.loadAsync(url);
  incrementProgress();

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
