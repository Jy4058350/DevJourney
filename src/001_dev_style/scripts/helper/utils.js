import { Vector3, Vector4, Quaternion } from "three";
import { viewport } from "./viewport";

// 線形補間
function lerp(a, b, n, limit = 0.001) {
  let current = (1 - n) * a + n * b;
  if (Math.abs(b - current) < limit) current = b;
  return current;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - viewport.cameraWidth / 2;
  const y = -rect.top - rect.height / 2 + viewport.cameraHeight / 2;
  return { x, y };
}

function getResolution(rect, mrect, uniforms) {
  const resolution = new Vector4(rect.width, rect.height, 1, 1);
  if (!mrect) return resolution;
  const mAspect = mrect.height / mrect.width;
  const aspect = rect.height / rect.width;
  console.log(mAspect, aspect);

  let xAspect, yAspect;
  if (aspect > mAspect) {
    xAspect = (1 / aspect) * mAspect;
    yAspect = 1;
  } else {
    xAspect = 1;
    yAspect = aspect / mAspect;
  }
  resolution.z = xAspect;
  // resolution.z = xAspect*uniforms.uTest.value;
  // resolution.w = yAspect;
  resolution.w = yAspect*uniforms.uTest.value;
  // console.log(uniforms.uTest.value);
  console.log(resolution.z, resolution.w)

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

function pointTo(_mesh, originalDir, targetDir) {
  // 回転軸の計算
  const _originalDir = new Vector3(
    originalDir.x,
    originalDir.y,
    originalDir.z
  ).normalize();
  const _targetDir = new Vector3(
    targetDir.x,
    targetDir.y,
    targetDir.z
  ).normalize();
  const dir = new Vector3().crossVectors(_originalDir, _targetDir).normalize();

  // 回転角の計算
  const dot = _originalDir.dot(_targetDir);
  const rad = Math.acos(dot);

  // クォータニオンの作成
  const q = new Quaternion();
  q.setFromAxisAngle(dir, rad);

  // メッシュを回転
  _mesh.rotation.setFromQuaternion(q);
}

export { lerp, getWorldPosition, getResolution, printMat, pointTo };
