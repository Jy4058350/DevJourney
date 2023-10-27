import gsap from "gsap";
import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { pointTo } from "../../helper/utils";

class ExtendObject extends CustomObject {
  before() {
    this.radius = this.rect.width;
  }

  fixGeometry() {
    // return new PlaneGeometry(this.rect.width, this.rect.height, 1, 1);
    const geo = super.fixGeometry();
    geo.scale(0.5, 0.5, 0.5);
    return geo;
  }

  fixMesh() {
    const cylinderGeo = new CylinderGeometry(
      this.radius,
      this.radius,
      this.rect.height / 2,
      80,
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

    const { position, normal } = cylinderGeo.attributes;
    // console.log(position);
    const oneLoop = cylinderGeo.attributes.position.count;
    const step = Math.floor(oneLoop / this.texes.size);
    // console.log(this.texes.size);
    console.log(step);
    let index = 0;

    // console.log(this.texes);
    this.texes.forEach((tex) => {
      const planeMat = this.material.clone();
      // console.log(cylinderMat);
      // cylinderMat.uniforms.texture.value = tex;
      // console.log(tex);
      planeMat.uniforms.tex1 = { value: tex };
      planeMat.side = 2;

      const planeGeo = this.geometry.clone();
      // const planeGeo = this.geometry;
      const plane = new Mesh(planeGeo, planeMat);

      const pickIndex = index * step;
      console.log(pickIndex);
      const x = position.getX(pickIndex);
      const y = position.getY(pickIndex);
      const z = position.getZ(pickIndex);
      // console.log(x, y, z);
      plane.position.set(x, 1, z);
      // plane.position.x = position.getX(pickIndex);
      // plane.position.z = position.getZ(pickIndex);

      const originalDir = { x: 0, y: 0, z: 1 };
      const targetDir = {
        x: normal.getX(pickIndex),
        y: 0,
        z: normal.getZ(pickIndex),
      };
      pointTo(plane, originalDir, targetDir);
      cylinder.add(plane);

      index++;
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
