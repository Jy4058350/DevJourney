import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uTest = { value: 1.0 };
    return uniforms;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}

export default ExtendObject;
