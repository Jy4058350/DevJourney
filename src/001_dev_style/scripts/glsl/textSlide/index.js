import gsap from "gsap";
import { Group, Mesh } from "three";

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

    console.log(this.texes);
    // const group = new Group();


    // // const planeGeo = this.geometry;
    // // const planeMat = this.material;
    // // console.log(planeMat);
    // // console.log(planeGeo);
    // // const plane = new Mesh(planeGeo, planeMat);

    // // group.add(plane);

    // return group;
    return super.fixMesh();
  }
}

export default ExtendObject;
