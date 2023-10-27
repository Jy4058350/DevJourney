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
      this.radius / 2,
      this.radius / 2,
      this.rect.height / 2,
      60,
      1,
      true
    );
    const cylinderMat = new MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      alphaTest: 0.5,
      wireframe: true,
      color: 0x000000,
    });
    const cylinder = new Mesh(cylinderGeo, cylinderMat);
    // cylinder.position.z = -this.radius;

    const attribute = cylinder.geometry.attributes;
    console.log(attribute);

    // console.log(this.texes);
    this.texes.forEach((tex) => {
      const cylinderMat = this.material.clone();
      // console.log(cylinderMat);
      // cylinderMat.uniforms.texture.value = tex;
      // console.log(tex);
      cylinderMat.uniforms.tex1 = { value: tex };

      const planeGeo = this.geometry.clone();
      // const planeGeo = this.geometry;
      const plane = new Mesh(planeGeo, cylinderMat);
      cylinder.add(plane);
    });

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
