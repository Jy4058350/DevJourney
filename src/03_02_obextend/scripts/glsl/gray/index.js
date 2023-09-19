import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class ExtendObject2 extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
  }
  fixVertex() {
    console.log(vertexShader);
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}

export default ExtendObject2;
