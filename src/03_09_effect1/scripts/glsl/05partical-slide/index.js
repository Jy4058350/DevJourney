import {
  PlaneGeometry,
  Float32BufferAttribute,
  DoubleSide,
  Points,
} from "three";
import gsap from "gsap";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { printMat } from "../../helper";

class ExtendObject extends CustomObject {
  fixTexes(u) {
    u.texCurrent = { value: this.texes.get("tex1") };
    u.texNext = { value: null };
    // console.log(this.texes.size);
    return u;
  }

  running = false;
  goToNext(idx, duration = 3) {
    const _idx = (idx % this.texes.size) + 1;

    if (this.running) return;
    this.running = true;

    const nextTex = this.texes.get(`tex${_idx}`);
    this.uniforms.texNext.value = nextTex;
    console.log(nextTex);
    gsap.to(this.uniforms.uProgress, {
      value: 0,
      duration,
      ease: "none",
      onStart: () => {
        this.$.el.nextElementSibling?.remove();
        this.mesh.visible = true;
      },
      onComplete: () => {
        this.uniforms.uProgress.value = 0;
        this.uniforms.texCurrent.value = this.uniforms.texNext.value;
        const imgEl = this.texes.get(`img${_idx}`).source.data;
        console.log(imgEl);
        const parentEl = this.$.el.parentElement;
        parentEl.appendChild(imgEl);
        this.mesh.visible = false;
        this.running = false;
      },
    });
  }
  afterInit() {
    this.goToNext(1, 0);
  }

  fixGeometry() {
    const width = Math.floor(this.rect.width),
      height = Math.floor(this.rect.height),
      wSeg = width / 2,
      hSeg = height / 2;
    const geometry = new PlaneGeometry(width, height, wSeg, hSeg);

    // 対角線上に詰められた遅延時間用の頂点データ
    const intensityVertices = getDiagonalVertices(
      hSeg,
      wSeg,
      () => random(0, 1500),
      0
    );

    function random(a, b) {
      return a + (b - a) * Math.random();
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
      "aIntensity",
      new Float32BufferAttribute(intensityVertices, 1)
    );

    return geometry;
  }

  fixMaterial() {
    const material = super.fixMaterial();

    material.side = DoubleSide;
    material.transparent = true;

    return material;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
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

  debug(toFolder) {
    // toFolder.add(this.uniforms.uEdge, "value", 0, 1, 0.1);
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("progress")
      .listen();

    const datObj = { next: !!this.uniforms.uProgress.value };
    toFolder
      .add(datObj, "next")
      .name("Animate")
      .onChange(() => {
        gsap.to(this.uniforms.uProgress, {
          value: +datObj.next,
          duration: 3,
          ease: "none",
        });
      });
  }
}

export default ExtendObject;
