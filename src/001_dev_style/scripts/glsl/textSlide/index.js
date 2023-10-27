import gsap from "gsap";
import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  before() {
    this.radius = this.rect.width;
  }

  fixMesh() {
    const cylinderGeo = new CylinderGeometry(
      this.radius,
      this.radius,
      this.rect.height,
      60,
      1,
      true
    );
    const cylinderMat = new MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      alphaTest: 0.5,
    });
    const cylinder = new Mesh(cylinderGeo, cylinderMat);
    return cylinder;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }
}

export default ExtendObject;
