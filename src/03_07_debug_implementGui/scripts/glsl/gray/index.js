import { CustomObject } from "../CustomObject";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { gui } from "../../helper";

let first = true;
class ExtendObject2 extends CustomObject {
  before() {
    // super.before();
    if (window.innerWidth < 768) {
      throw new Error("skip");
    }
    if (first) {
      console.log("b2");
      first = false;
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
    console.log("a2");
  }
}

export default ExtendObject2;
