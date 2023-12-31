import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class ExtendObject extends CustomObject {
  // constructor({ texes, el, type, canvasRect }) {
  //   super({ texes, el, type, canvasRect });
  // }
  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}

export default ExtendObject;
