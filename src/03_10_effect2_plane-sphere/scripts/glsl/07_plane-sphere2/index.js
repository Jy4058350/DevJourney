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
    const wSeg = Math.floor(this.rect.width) / 10,
      hSeg = Math.floor(this.rect.height) / 10;
    const radius = 100;
    const sphere = new SphereGeometry(radius, wSeg, hSeg);
    sphere.rotateY(Math.PI * 1.4);
    const plane = new PlaneGeometry(width, height, wSeg, hSeg);
    const geometry = new BufferGeometry();

    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    geometry.setAttribute("sphere", sphere.getAttribute("position"));
    geometry.setAttribute("sphereNormal", sphere.getAttribute("normal"));
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

    // console.log(delayVertices);

    geometry.setAttribute(
      "aDelay",
      new Float32BufferAttribute(delayVertices, 1)
    );

    return geometry;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uScaleDelay = { value: 5 };
    uniforms.uSphereRadius = { value: 1.0 };
    uniforms.strength = { value: 0.0 };
    uniforms.frequency = { value: 0.0 };
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
    toFolder
      .add(this.uniforms.strength, "value", 0, 20, 1.0)
      .name("strength")
      .listen();
    toFolder
      .add(this.uniforms.frequency, "value", 0, 0.1, 0.001)
      .name("frequency")
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
