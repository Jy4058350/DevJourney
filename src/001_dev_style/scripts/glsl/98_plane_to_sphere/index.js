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
    const wSeg = 30,
      hSeg = 30;
    const sphere = new SphereGeometry(200, wSeg, hSeg);
    const plane = new PlaneGeometry(600, 300, wSeg, hSeg);
    const geometry = new BufferGeometry();

    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    geometry.setAttribute("sphere", sphere.getAttribute("position"));

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

    // console.log(delayVertices);

    geometry.setAttribute(
      "aDelay",
      new Float32BufferAttribute(delayVertices, 1)
    );

    return geometry;
  }

  fixMaterial() {
    const material = super.fixMaterial();
    material.side = 2;
    return material;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uColorTime = { value: 0.005 };
    uniforms.uColorDelay = { value: 0.0 };
    uniforms.uSaturation = { value: 0.7 };
    uniforms.uBrightness = { value: 0.67 };
    uniforms.uScaleTime = { value: 0.04 };
    uniforms.uScaleDelay = { value: 5 };
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
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
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
