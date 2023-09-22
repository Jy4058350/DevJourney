import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { gui } from "../../helper";

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
    gui.ga((g) => {
      g.add(this.uniforms.uProgress, "value", 0, 1, 0.1).name("uProgress");
    });
  }
}

export default ExtendObject2;

