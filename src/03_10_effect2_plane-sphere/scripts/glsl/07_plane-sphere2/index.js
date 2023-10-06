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

class ExtendObject extends CustomObject {
  fixGeometry() {
    const width = this.rect.width,
      height = this.rect.height;
    const wSeg = Math.floor(this.rect.width) / 20,
      hSeg = Math.floor(this.rect.height) / 20;
    const radius = 200;
    // const sphere = new SphereGeometry(radius, wSeg, hSeg);
    // const geometry = new PlaneGeometry(width, height, wSeg, hSeg);
    const plane = new PlaneGeometry(width, height, wSeg, hSeg);
    const geometry = new BufferGeometry();
    console.log(geometry);

    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    // geometry.setAttribute("sphere", sphere.getAttribute("position"));
    // geometry.setAttribute("sphereNormal", sphere.getAttribute("normal"));
    // geometry.setAttribute("planeNormal", plane.getAttribute("normal"));

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

    // planegeometryのindexをbuffergeometryにセット
    const planeIndexs = plane.getIndex().array;
    geometry.setIndex(new BufferAttribute(planeIndexs, 1));

    return geometry;
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

  // fixMesh() {
  //   return new Points(this.geometry, this.material);
  // }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("progess")
      .listen();

    const datData = { next: !!this.uniforms.uProgress.value };
    toFolder
      .add(datData, "next")
      .name("Animate")
      .onChange(() => {
        gsap.to(this.uniforms.uProgress, {
          value: +datData.next,
          duration: 2,
          ease: "power2.inOut",
        });
      });
  }
}

export default ExtendObject;
