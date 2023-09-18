import gsap from "gsap";
import { TextureLoader, VideoTexture } from "three";
import { iNode } from "../helper";
import { on } from "events";

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
    let prms;
    // const loadFn = url.endsWith(".mp4") ? loadVideo : loadTex;
    if (url.endsWith(".mp4")) {
      prms = loadVideo(url).then((tex) => {
        box.set(url, tex);
      });
    } else {
      prms = loadTex(url).then((tex) => {
        box.set(url, tex);
      });
    }
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
  incrementTotal();
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsinline = true;

    console.log(video);
    video.oncanplay = () => {
      const tex = new VideoTexture(video);
      incrementProgress();
      video.play();
      oncanplay = null;
      resolve(tex);
    };
  });
}

async function texMap(el) {
  const texes = new Map();
  const data = el.dataset;
  let m = null;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;

    const url = data[key];
    key = key.replace("-", "");
    texes.set(key, box.get(url));

    if(el instanceof HTMLImageElement) {
      m = new Promise((resolve) => {
        el.onload = () => {
          resolve(el);
        };
      });
      await m;
    }
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
