import gsap from "gsap";
import { Group } from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  before() {
    // this.activeSlide = 0;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();

    uniforms.uActiveSlideIndex = { value: this.activeSlide };
    return uniforms;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  fixMesh() {
    const group = new Group();

    return group;
  }
}

export default ExtendObject;
