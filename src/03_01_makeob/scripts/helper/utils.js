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



export { lerp, getWorldPosition, getResolution };
