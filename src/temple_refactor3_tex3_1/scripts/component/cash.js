import { LinearFilter, TextureLoader } from "three";
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
