import CustomObject from "../CustomObject";

import vertexShader from "./normal/vertex.glsl";
import fragmentShader from "./normal/fragment.glsl";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
  }
  fixVertex() {
    this.material.vertexShader = vertexShader;
  }

  fixFragment() {
    this.material.fragmentShader = fragmentShader;
  }
}
