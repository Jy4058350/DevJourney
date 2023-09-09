import { LinearFilter, TextureLoader, VideoTexture } from "three";
import { iNode } from "../../../iNode";
import gsap from "gsap";

const texLoader = new TextureLoader();
const cashes = new Map();

const $ = {};
const cash = {
  init,
  load,
  texIs,
  videoIs,
  clientProgressAction,
  clientContentStart,
  cashes,
  $,
};

function init() {
  $.pageContainer = iNode.qs("#page-container");
  $.loader = iNode.qs("#loader");
  $.progressBar = iNode.qs(".progress-bar");
  $.loaderPersent = iNode.qs(".loader-persent");
}

async function load() {
  const els = iNode.qsa("[data-webgl]");

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

  const texPrms = [];
  cashes.forEach((_, url) => {
    //ここに動画の処理を追加
    let prms = null;

    // if (/\.(mp4|webm|mov)$/.test(url)) {
    //   prms = videoIs(url).then((tex) => {
    //     cashes.set(url, tex);
    //   });
    // } else {
    //   prms = texIs(url).then((tex) => {
    //     cashes.set(url, tex);
    //   });
    // }
    const loadFn = /\.(mp4|webm|mov)$/.test(url) ? videoIs : texIs;
    prms = loadFn(url).then((tex) => {
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

async function videoIs(url) {
  const video = document.createElement("video");
  let extention = url.split(".").pop();
  if (extention === "mov") {
    extention = "quicktime";
  }
  if (!video.canPlayType(`video/${extention}`)) {
    return null;
  }

  totalNumIs();
  return new Promise((resolve) => {
    const video = document.createElement("video"); //ブラウザ上に新しい<video>要素を作成する
    video.oncanplay = () => {
      const tex = new VideoTexture(video);
      countNumIs();
      // oncanplayは、動画の再生が可能になった時に発生するイベント//非同期処理
      tex.magFilter = LinearFilter; //??
      tex.minFilter = LinearFilter; //??
      video.play();
      //動画の再生がとまっている場合は、再生する
      video.oncanplay = null;
      resolve(tex); //非同期処理が完了したらresolveを呼び出す
    };
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsinline = true;
    video.defaultMuted = true;
  });
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

function clientProgressAction(_cb) {
  _progressAction = _cb;
}

function clientContentStart() {
  const tl = gsap.timeline();
  tl.to($.loader, {
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  })
    .set($.pageContainer, {
      visibility: "visible",
    })
    .set($.loader, {
      display: "none",
    });
    return tl;
}


export default cash;
