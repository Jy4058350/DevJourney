import gsap from "gsap";
import {
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  VideoTexture,
} from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { pointTo, lerp } from "../../helper/utils";

class ExtendObject extends CustomObject {
  before() {
    this.radius = this.rect.width;
    this.rotateAxis = new Vector3(0, 1, 0);
    this.differenceRadius = 0;
    this.activeIndex = 0;
    this.scale = 1;

    this.texes.forEach((tex) => {
      if (tex.source.data instanceof HTMLVideoElement) {
        tex.source.data.pause?.();
      }
    });
  }
  afterInit() {
    console.log(this.activeIndex);
    this.goToNext(this.activeIndex);
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uRadius = { value: this.radius };
    uniforms.uSlideIndex = { value: 0 };
    uniforms.uSlideTotal = { value: this.texes.size };
    uniforms.uActiveIndex = { value: this.activeIndex };
    uniforms.scale = { value: this.scale };

    return uniforms;
  }

  fixGeometry() {
    const geo = super.fixGeometry();
    geo.scale(0.5, 0.5, 0.5);
    return geo;
  }

  fixMesh() {
    const cylinderGeo = new CylinderGeometry(
      this.radius,
      this.radius,
      this.rect.height / 2,
      100,
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
    // const oneLoop = cylinderGeo.attributes.position.count;
    const oneLoop = cylinderGeo.attributes.position.count / 2;
    const step = Math.floor(oneLoop / this.texes.size);
    console.log(step);
    let index = 0;

    this.texes.forEach((tex) => {
      const planeMat = this.material.clone();
      planeMat.uniforms.tex1 = { value: tex };
      planeMat.side = 2;
      planeMat.uniforms.uSlideIndex.value = index;
      planeMat.uniforms.uActiveIndex = this.uniforms.uActiveIndex;
      planeMat.uniforms.uTick = this.uniforms.uTick;
      planeMat.uniforms.uProgress = this.uniforms.uProgress;
      const planeGeo = this.geometry.clone();
      const plane = new Mesh(planeGeo, planeMat);

      const pickIndex = index * step;
      // console.log(pickIndex);
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

    // console.log(cylinder);
    this.slides = Array.from(cylinder.children);
    console.log(this.slides.length);

    return cylinder;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  goToNext(index) {
    this.differenceRadius -=
      ((index - this.activeIndex) * 2 * Math.PI) / this.slides.length;
    this.activeIndex = index;
    this.playVideo(index);
  }

  render(tick) {
    super.render(tick);
    if (this.differenceRadius === 0) return;

    const rad = lerp(this.differenceRadius, 0, 0.95);
    this.mesh.rotateOnWorldAxis(this.rotateAxis, rad);
    this.differenceRadius -= rad;

    const uActiveIndex = this.uniforms.uActiveIndex.value;
    const index = lerp(uActiveIndex, this.activeIndex, 0.05);
    this.uniforms.uActiveIndex.value = index;
    console.log(this.differenceRadius);
    this.differenceRadius = 0;
    console.log(this.differenceRadius);
  }

  playVideo(index) {
    const i = index % this.slides.length;
    const slide = this.slides.at(i);

    this.playingVideo?.pause?.();
    if (
      slide.material.uniforms.tex1.value.source.data instanceof HTMLVideoElement
    ) {
      this.playInterval = setInterval(() => {
        if (this.uniforms.uActiveIndex.value === index) {
          this.playingVideo = slide.material.uniforms.tex1.value.source.data;
          this.playingVideo.play?.();
          clearInterval(this.playInterval);
        }
      }, 200);
    }
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
      .name("uProgress")
      .listen();
    const idx = { value: 0 };
    toFolder
      .add(idx, "value", 0, 12, 1)
      .name("go to next")
      .onChange(() => {
        this.goToNext(idx.value);
      });

    const datData = { next: !!this.uniforms.uProgress.value };
    toFolder.add(datData, "next").onChange(() => {
      gsap.to(this.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 0.5,
        ease: "none",
      });
    });
  }
}

export default ExtendObject;
