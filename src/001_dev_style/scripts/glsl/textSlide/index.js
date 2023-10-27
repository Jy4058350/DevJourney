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
    const oneLoop = cylinderGeo.attributes.position.count;
    const step = Math.floor(oneLoop / this.texes.size);
    console.log(step);
    let index = 0;

    this.texes.forEach((tex) => {
      const planeMat = this.material.clone();
      planeMat.uniforms.tex1 = { value: tex };
      planeMat.side = 2;

      const planeGeo = this.geometry.clone();
      const plane = new Mesh(planeGeo, planeMat);

      const pickIndex = index * step;
      console.log(pickIndex);
      const x = position.getX(pickIndex);
      const y = position.getY(pickIndex);
      const z = position.getZ(pickIndex);
      plane.position.set(x, 1, z);

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

  goToNext(idx) {}

  debug(toFolder) {
    // toFolder.add(this.uniforms.uEdge, "value", 0, 1, 0.1);
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("progress")
      .listen();

    // const datObj = { next: !!this.uniforms.uProgress.value };
    const idx = { value: 0 };
    toFolder
      .add(idx, "value", 0, 12, 1)
      .name("go to next")
      .onChange(() => {
        this.goToNext(idx.value);
      });
  }
}

export default ExtendObject;
