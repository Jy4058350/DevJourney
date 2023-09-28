import { PlaneGeometry, Float32BufferAttribute } from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { printMat } from "../../helper";

class ExtendObject extends CustomObject {
  fixGeometry() {
    const width = 600,
      height = 300,
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
    // printMat(delayVertices, wSeg + 1, "遅延時間行列");

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

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  printMat(targetMatrix, col = 4, label = "") {
    const mat1D = targetMatrix?.elements ?? targetMatrix?.array ?? targetMatrix;
    console.log(mat1D);
    if (!mat1D instanceof Array) return;
    setTimeout(() => {
      // 非同期でマトリクスが更新されるため、非同期で実行
      let mat2D = mat1D.reduce((arry2D, v, i) => {
        if (i % col === 0) {
          arry2D.push([]);
        }
        const lastArry = arry2D[arry2D.length - 1];
        lastArry.push(v);
        return arry2D;
      }, []);
      console.log(
        `%c${label}`,
        "font-size: 1.3em; color: red; background-color: #e4e4e4;"
      );
      console.table(mat2D);
    });
  }
}

export default ExtendObject;
