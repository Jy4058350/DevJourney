import {
  PlaneGeometry,
  SphereGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
} from "three";
import gsap from "gsap";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  fixGeometry() {
    const width = 600,
      height = 300;
    const wSeg = width / 2,
      hSeg = height / 2;
    const geometry = new PlaneGeometry(width, height, wSeg, hSeg);

    // 対角線上に詰められた遅延時間用の頂点データ
    const intensityV = intensityVertices(hSeg, wSeg, intensity, 0);
    //  printMat(intensityV, wSeg + 1, '遅延時間行列');

    function random(a, b) {
      return a + (b - a) * Math.random();
    }
    // 0~1までの値をstep毎に返す
    function intensity() {
      return random(0, 5000);
    }


    // 対角線上に頂点を詰めた配列を返す
    function intensityVertices(hSeg, wSeg, intensity, defaultValue) {
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
          currentValue = intensity(currentValue, currentIndex);
          arry[currentIndex] = currentValue;
        }
      }
      return arry;
    }

    // console.log(intensityV);

    geometry.setAttribute(
      "aIntensity",
      new Float32BufferAttribute(intensityV, 1)
    );

    return geometry;
  }

  fixMaterial() {
    const material = super.fixMaterial();
    material.side = 2;
    transparent: true;
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
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("uProgress")
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
