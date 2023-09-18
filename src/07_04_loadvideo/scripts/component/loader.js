import gsap from "gsap";
import { TextureLoader, VideoTexture } from "three";
import { iNode } from "../helper";

const $ = {};
const loader = {
  init,
  loadTex,
  texMap,
  addProgressAction,
  loadDom,
  loadingAnimation,
  loadVideo,
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
      }
    }
  });
  const texPrms = [];

  box.forEach((_, url) => {
    const loadFn = url.endsWith(".mp4") ? loadVideo : loadTex;
    const prms = loadFn(url).then((tex) => {
      box.set(url, tex);
    });
    texPrms.push(prms);
  });
  await Promise.all(texPrms);
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

async function loadTex(url) {
  incrementTotal();
  const tex = await texLoader.loadAsync(url);
  incrementProgress();

  return tex;
}

async function loadVideo(url) {
  const video = document.createElement("video");
  video.src = url;
  console.log(video);
  video.oncanplay = () => {
    const tex = new VideoTexture(video);
    
  };

  return video;
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
