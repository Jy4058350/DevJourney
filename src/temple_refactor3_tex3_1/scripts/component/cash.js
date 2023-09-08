import { LinearFilter, TextureLoader, VideoTexture } from "three";
import { iNode } from "../../../iNode";
import gsap from "gsap";

import { texesIs } from "./texes";

const texLoader = new TextureLoader();
const cashes = new Map();
const $ = {};
const cash = {
  init,
  load,
  texIs,
  videoIs,
  cashes,
  clientProgressAction,
  clientContentStart,
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
  const texPrms = [];

  els.forEach((el) => {
    const data = el.dataset;

    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      const url = data[key];
      if (!cashes.has(url)) {
        cashes.set(url, null);
        console.log(url);
      }
    }
  });

  cashes.forEach((_, url) => {
    //ここに動画の処理を追加
    let prms = null;
    if (/\.mp4$/.test(url)) {
      prms = videoIs(url).then((tex) => {
        cashes.set(url, tex);
      });
    } else {
      prms = texIs(url).then((tex) => {
        cashes.set(url, tex);
      });
    }
    texPrms.push(prms);
  });

  console.log(texPrms);
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
  totalNumIs();
  return new Promise((resolve) => {
    const video = document.createElement("video"); //ブラウザ上に新しい<video>要素を作成する
    video.src = url; //src属性にurlを設定
    video.autoplay = true; //autoplay属性をtrueに設定
    video.loop = true; //loop属性をtrueに設定
    video.muted = true; //muted属性をtrueに設定
    video.playsInline = true; //playsinline属性をtrueに設定
    video.defaultMuted = true; //defaultMuted属性をtrueに設定
    video.oncanplay = () => {
      countNumIs();
      // oncanplayは、動画の再生が可能になった時に発生するイベント//非同期処理
      const tex = new VideoTexture(video);
      // const tex = await texLoader.loadAsync(url);
      tex.magFilter = LinearFilter; //??
      tex.minFilter = LinearFilter; //??
      video.play();
      video.oncanplay = null;
      // tex.needsUpdate = false;
      resolve(tex); //非同期処理が完了したらresolveを呼び出す
      // console.log(tex);
    };
  });
}

function totalNumIs() {
  totalNum++;
}

function countNumIs() {
  countNum++;
  _progressAction(countNum, totalNum);
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
}

export default cash;
