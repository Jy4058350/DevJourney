import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class ExtendObject2 extends CustomObject {
  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}

export default ExtendObject2;
