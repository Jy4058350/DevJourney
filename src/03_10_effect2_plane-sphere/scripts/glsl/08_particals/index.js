import {
  Float32BufferAttribute,
  SphereGeometry,
  PlaneGeometry,
  BufferGeometry,
  Points,
  BufferAttribute,
} from "three";
import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { getWorldPosition } from "../../helper";

let scrolling = false;

class ExtendObject extends CustomObject {
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
      duration: 1.0,
      ease: "none",
      onStart: () => {
        this.$.el.nextElementSibling?.remove();
        this.mesh.visible = true;
      },
      onComplete: () => {
        this.uniforms.texCurrent.value = this.uniforms.texNext.value;
        this.uniforms.uProgress.value = 0;
        const imgEl = nextTex.source.data;
        const parentEl = this.$.el.parentElement;
        parentEl.append(imgEl);
        this.mesh.visible = false;
        this.running = false;
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
    // const sphere = new SphereGeometry(radius, wSeg, hSeg);
    // sphere.rotateY(Math.PI * 1.4);
    const plane = new PlaneGeometry(width, height, wSeg, hSeg);
    const geometry = new BufferGeometry();

    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    // geometry.setAttribute("sphere", sphere.getAttribute("position"));
    // geometry.setAttribute("sphereNormal", sphere.getAttribute("normal"));
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
    uniforms.uSize = { value: 1.0 };
    uniforms.frequency = { value: 0.01 };
    uniforms.noiseScale = { value: 1.4 };
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
      .add(this.uniforms.noiseScale, "value", 0.01, 5.0, 0.1)
      .name("noiseScale")
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
