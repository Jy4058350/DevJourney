import { Vector4 } from "three";
import { viewport } from "./viewport";

// 線形補間
function lerp(a, b, n) {
  let current = (1 - n) * a + n * b;
  if (Math.abs(b - current) < 0.001) current = b;
  return current;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - viewport.cameraWidth / 2;
  const y = -rect.top - rect.height / 2 + viewport.cameraHeight / 2;
  return { x, y };
}

function getResolution(rect, mrect) {
  const resolution = new Vector4(rect.width, rect.height, 1, 1);
  if (!mrect) return resolution;
  const mAspect = mrect.height / mrect.width;
  const aspect = rect.height / rect.width;

  let xAspect, yAspect;
  if (aspect > mAspect) {
    xAspect = (1 / aspect) * mAspect;
    yAspect = 1;
  } else {
    xAspect = 1;
    yAspect = aspect / mAspect;
  }
  resolution.z = xAspect;
  resolution.w = yAspect;

  return resolution;
}

function printMat(targetMatrix, col = 4, label = "") {
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

export { lerp, getWorldPosition, getResolution, printMat };
