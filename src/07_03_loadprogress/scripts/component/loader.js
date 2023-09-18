import gsap from "gsap";
import { TextureLoader } from "three";
import { iNode } from "../helper";

const $ = {};
const loader = {
  init,
  load,
  texMap,
  addProgressAction,
  loadDom,
  loadingAnimation,
  $,
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
let _progressAction = null;

function loadDom() {
  $.p = iNode.qs(".percent");
  $.b = iNode.qs(".progress-bar");
  $.l = iNode.qs("#loader");
  $.g = iNode.qs("#global-container");
}

function incrementTotal() {
  total++;
}

function incrementProgress() {
  loaded++;
  if (_progressAction) {
    _progressAction(loaded, total);
  }
}

function addProgressAction(cb) {
  _progressAction = cb;
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

function loadingAnimation() {
  const tl = gsap.timeline();
  tl.to($.l, {
    opacity: 0,
    duration: 0.5,
    delay: 1.5,
  })
    .set($.g, {
      duration: 0.5,
      visibility: "visible",
    })
    .set($.l, {
      display: "none",
    });
}

export { loader };
