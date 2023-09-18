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
const p = iNode.qs(".percent");
const b = iNode.qs(".progress-bar");

function increment() {
  total++;
}

function progress() {
  loaded++;
}

async function load(url) {
  increment();
  const tex = await texLoader.loadAsync(url);
  progress();
  const percent = Math.floor((loaded / total) * 100);
  p.innerHTML = `${percent} %`;
  b.style.width = `${percent}%`;

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
