import {
  Float32BufferAttribute,
  SphereGeometry,
  PlaneGeometry,
  BufferGeometry,
  Points,
  BufferAttribute,
  Vector3,
} from "three";
import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { iNode } from "../../helper/iNode";

let scrolling = false;

class ExtendObject extends CustomObject {
  before() {
    // this.$.MediaEls = this.$.el.qsa("video, img");
    let _idx = 1;
    this.$.MediaEls = iNode.qsa("video, img");
    this.texes.forEach((tex) => {
      const el = tex.source.data;
      // console.log(el);
      el.classList.add("MediaChild");
      this.$.MediaEls.push(el);
      // this.$.el.parentElement.append(el);
    });

    // console.log(this.$.MediaEls);
  }
  getEl(idx) {
    // console.log(this.$.MediaEls[idx]);
    return this.$.MediaEls[idx];
  }

  fixTexes(u) {
    u.texCurrent = { value: this.texes.get("tex1") };
    u.texNext = { value: null };
    return u;
  }

  running = false;
  goToNext(idx) {
    const _idx = (idx % this.texes.size) + 1;

    if (this.running) return;
    this.running = true;

    const nextTex = this.texes.get(`tex${_idx}`);
    this.uniforms.texNext.value = nextTex;
    gsap.to(this.uniforms.uProgress, {
      value: 1,
      duration: 3.0,
      ease: "none",
      onStart: () => {
        this.$.el.nextElementSibling?.remove();
        this.mesh.visible = true;
        this.$.el.pause?.();
      },
      onComplete: () => {
        this.uniforms.texCurrent.value = this.uniforms.texNext.value;
        this.uniforms.uProgress.value = 0;
        const imgEl = nextTex.source.data;
        const parentEl = this.$.el.parentElement;
        parentEl.append(imgEl);
        this.mesh.visible = false;
        this.running = false;
        this.$.el.play?.();
        this.getEl(_idx);
      },
    });
  }
  async afterInit() {
    this.goToNext(0, 0);
  }

  fixGeometry() {
    const width = this.rect.width,
      height = this.rect.height;
    const wSeg = Math.floor(this.rect.width) / 10,
      hSeg = Math.floor(this.rect.height) / 10;
    const radius = 100;
    const plane = new PlaneGeometry(width, height, wSeg, hSeg);
    const geometry = new BufferGeometry();

    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    geometry.setAttribute("planeNormal", plane.getAttribute("normal"));

    // planegeometryのindexをbuffergeometryにセット
    const planeIndexs = plane.getIndex().array;
    geometry.setIndex(new BufferAttribute(planeIndexs, 1));

    // 対角線上に詰められた遅延時間用の頂点データ
    const delayVertices = getDiagonalVertices(hSeg, wSeg, getValue, 0);
    //  printMat(delayVertices, wSeg + 1, '遅延時間行列');

    // 0~1までの値をstep毎に返す
    function getValue(previousValue, currentIndex) {
      let step = 1 / (hSeg + 1) / (wSeg + 1);
      return previousValue + step;
    }

    // 対角線上に頂点を詰めた配列を返す
    function getDiagonalVertices(hSeg, wSeg, getValue, defaultValue) {
      const hSeg1 = hSeg + 1,
        wSeg1 = wSeg + 1;
      let arry = [],
        currentValue = defaultValue;
      for (let i = 0; i < hSeg1 + wSeg1 - 1; i++) {
        for (
          let j = Math.min(hSeg1, i + 1) - 1;
          j >= Math.max(0, i - wSeg1 + 1);
          j--
        ) {
          let currentIndex = j * wSeg1 + i - j;
          currentValue = getValue(currentValue, currentIndex);
          arry[currentIndex] = currentValue;
        }
      }
      return arry;
    }

    geometry.setAttribute(
      "aDelay",
      new Float32BufferAttribute(delayVertices, 1)
    );

    return geometry;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uSpeed = { value: 0.1 };
    uniforms.uSparkle = { value: 0.1 };
    uniforms.uSize = { value: 20.0 };
    uniforms.uPan = { value: new Vector3(0.5, 0.5, 0.5) };
    uniforms.uNoise = { value: new Vector3(0.005, 0.0, 0.01) };
    return uniforms;
  }

  fixMesh() {
    return new Points(this.geometry, this.material);
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  scroll() {
    scrolling = true;
    const s = super.scroll();
    scrolling = false;
    return s;
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uSpeed, "value", 0, 1, 0.1)
      .name("uSpeed")
      .listen();
    toFolder
      .add(this.uniforms.uSparkle, "value", 0, 1, 0.1)
      .name("uSparkle")
      .listen();
    toFolder
      .add(this.uniforms.uSize, "value", 0.1, 50, 0.1)
      .name("uSize")
      .listen();
    toFolder
      .add(this.uniforms.uPan.value, "x", 0.0, 10, 0.1)
      .name("uPan.x")
      .listen();
    toFolder
      .add(this.uniforms.uPan.value, "y", 0.0, 10, 0.1)
      .name("uPan.y")
      .listen();
    toFolder
      .add(this.uniforms.uPan.value, "z", 0.0, 10, 0.1)
      .name("uPan.z")
      .listen();
    toFolder
      .add(this.uniforms.uNoise.value, "x", 0.0, 10, 0.1)
      .name("uNoise.x")
      .listen();
    toFolder
      .add(this.uniforms.uNoise.value, "y", 0.0, 10, 0.1)
      .name("uNoise.y")
      .listen();
    toFolder
      .add(this.uniforms.uNoise.value, "z", 0.0, 10, 0.1)
      .name("uNoise.z")
      .listen();

    // const datData = { next: !!this.uniforms.uProgress.value };
    const idx = { value: 0 };
    toFolder
      .add(idx, "value", 0, 12, 1)
      .name("go to next")
      .onChange(() => {
        this.goToNext(idx.value);
      });
  }
}

export default ExtendObject;
