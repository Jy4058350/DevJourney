import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class ExtendObject2 extends CustomObject {
  before() {
    if (window.innerWidth < 768) {
      throw new Error("skip");
    }
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  afterInit() {
    super.afterInit();
  }
}

export default ExtendObject2;
