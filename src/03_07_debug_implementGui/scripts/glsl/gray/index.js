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

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uEdge = { value: 0.0 };
    return uniforms;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  afterInit() {}

  debug() {
    // super.afterInit();
    gui.ga((g) => {
      g.add(this.uniforms.uEdge, "value", 0, 1, 0.1).name("uEdge");
    });
    console.log("a2");
  }
}

export default ExtendObject2;
