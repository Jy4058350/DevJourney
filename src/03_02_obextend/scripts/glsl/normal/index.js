import CustomObject from "../CustomObject";

import vertexShader from "./normal/vertex.glsl";
import fragmentShader from "./normal/fragment.glsl";

export class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
  }
  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}
