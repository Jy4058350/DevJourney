import gsap from "gsap";
import { TextureLoader, VideoTexture } from "three";
import { iNode, config } from "../helper";

const $ = {};
const loader = {
  init,
  loadTex,
  texMap,
  addProgressAction,
  loadDom,
  loadVideo,
  $,
  begin,
  getTexture,
};

const texLoader = new TextureLoader();

const box = new Map();

async function init() {
  const els = iNode.qsa(`[data-${config.prefix.glsl}]`);
  els.forEach((el) => {
    const data = el.dataset;
    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      if (key.startsWith("tex")) {
        const url = data[key];
        if (!box.has(url)) {
          box.set(url, null);
          // console.log("box", box);
        }
      }
    }
  });
  const texPrms = [];

  box.forEach((_, url) => {
    let prms;
    if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov")) {
      prms = loadVideo(url).then((tex) => {
        // console.log(url);
        box.set(url, tex);
      });
    } else {
      prms = loadTex(url).then((tex) => {
        box.set(url, tex);
        // console.log("box", box);
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
  $.g = iNode.qs("#globalContainer");
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
  let u = url.split(".").pop();
  // console.log(u);
  if (u === "mov") {
    u = "quicktime";
  }
  if (!video.canPlayType(`video/${u}`)) {
    return null;
  }
  // console.log(!video.canPlayType(`video/${u}`));

  incrementTotal();
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsinline = true;

    // console.log(video);
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
  if (!el) return null; //added by me

  const texes = new Map();
  const data = el.dataset;
  let m = null;
  let first = true;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;

    const url = data[key];
    const tex = box.get(url);
    key = key.replace("-", "");
    texes.set(key, tex);
    // texes.set(key, box.get(url));

    if (first && el instanceof HTMLImageElement) {
      m = new Promise((resolve) => {
        el.onload = () => {
          resolve();
        };
      });
      el.src = url;
      first = false;
    }
    await m;
    // console.log(url);
    if (first && el instanceof HTMLVideoElement) {
      m = new Promise((resolve) => {
        el.onloadeddata = () => {
          resolve();
        };
      });
      el.src = url;
      first = false;
    }
    await m;
    // console.log(url);
  }

  return texes;
}

function getTexture(url) {
  console.log("getTexture box", box);
  return box.get(url);
}

function _loadingAnimation() {
  const tl = gsap.timeline();
  tl.to($.l, {
    opacity: 0,
    duration: 0.3,
    delay: 0.5,
  })
    .set($.g, {
      duration: 0.5,
      visibility: "visible",
    })
    .set($.l, {
      display: "none",
    });

  return tl;
}

async function _loadingAnimationEnd(tl) {
  return new Promise((resolve) => {
    tl.to($.p, {
      opacity: 1,
      duration: 1.0,
      oncomplete() {
        resolve();
      },
    });
  });
}

async function begin() {
  const tl = _loadingAnimation();
  return await _loadingAnimationEnd(tl);
}

export { loader };