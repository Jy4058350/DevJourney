import gsap from "gsap";
import {
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  VideoTexture,
  Group,
} from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { pointTo, lerp } from "../../helper/utils";
import {
  countUp,
  slideTextIndex,
  updateSlideIndex,
} from "../../component/slideIndex";

let slideIndex = 0;

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

  fixGsap() {
    // let index = countUp(slideIndex);
    let index = countUp(this.uniforms.uIndex.value);
    // console.log(index);
    const tl = new gsap.timeline();
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: index % 2 === 0 ? 5.0 : 1.0,
      ease: "ease",
      onComplete: () => {
        // console.log(this.uniforms.uIndex.value);
        this.uniforms.uIndex.value = slideTextIndex(index);
        this.uniforms.uProgress.value = 0.0;
        slideIndex++;
        this.fixGsap(index);
        // this.goToNext(this.uniforms.uIndex.value);
        this.goToNext(slideTextIndex(index));
      },
    });
  }

  afterInit() {
    this.goToNext(this.activeIndex);
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uRadius = { value: this.radius };
    uniforms.uSlideIndex = { value: 0 };
    uniforms.uSlideTotal = { value: this.texes.size };
    uniforms.uActiveIndex = { value: this.activeIndex };
    uniforms.scale = { value: this.scale };
    uniforms.uIndex = { value: 0.0 };

    return uniforms;
  }

  fixTexes(u) {
    return u;
  }

  fixGeometry() {
    const geo = super.fixGeometry();
    geo.scale(0.5, 0.5, 0.5);
    geo.translate(-100, 0, 100.0);

    return geo;
  }

  fixMesh() {
    const group = new Group();
    // const cylinderGeo = new CylinderGeometry(
    //   this.radius,
    //   this.radius,
    //   this.rect.height / 2,
    //   100,
    //   1,
    //   true
    // );
    // const cylinderMat = new MeshBasicMaterial({
    //   transparent: true,
    //   opacity: 0,
    //   alphaTest: 0.5,
    // });
    // const cylinder = new Mesh(cylinderGeo, cylinderMat);
    // // cylinder.position.z = -this.radius;

    // const { position, normal } = cylinderGeo.attributes;
    // const oneLoop = cylinderGeo.attributes.position.count;
    // const oneLoop = cylinderGeo.attributes.position.count / 2;
    // const step = Math.floor(oneLoop / this.texes.size);
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

      // console.log(plane);

      // const pickIndex = index * step;
      // console.log(pickIndex);
      // const x = position.getX(pickIndex);
      // const y = position.getY(pickIndex);
      // const z = position.getZ(pickIndex);
      // plane.position.set(x, 1, z);

      // const originalDir = { x: 0, y: 0, z: 1 };
      // const targetDir = {
      //   x: normal.getX(pickIndex),
      //   y: 0,
      //   z: normal.getZ(pickIndex),
      // };
      // pointTo(plane, originalDir, targetDir);
      group.add(plane);

      index++;
    });

    this.slides = Array.from(group.children);

    return group;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  goToNext(slideIndex) {
    this.differenceRadius -=
      ((slideIndex - this.activeIndex) * 2 * Math.PI) / this.slides.length;
    this.activeIndex = slideIndex;
    this.playVideo(slideIndex);
  }

  render(tick) {
    super.render(tick);
    if (this.differenceRadius === 0) return;

    // const rad =
    //   lerp(this.differenceRadius, 0, 0.95, 0.0001) || this.differenceRadius;
    // // const rad = lerp(this.differenceRadius, 0, 0.95);
    // this.mesh.rotateOnWorldAxis(this.rotateAxis, rad);
    // this.differenceRadius -= rad;

    const uActiveIndex = this.uniforms.uActiveIndex.value;
    const index = lerp(uActiveIndex, this.activeIndex, 0.05, 0.005);
    this.uniforms.uActiveIndex.value = index;
    // console.log(this.differenceRadius);
    // console.log(index, uActiveIndex, this.activeIndex);
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
      .add(this.uniforms.uIndex, "value", 0, 15, 1)
      .name("uIndex")
      .listen();
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
      .name("uProgress")
      .listen();
    // const idx = { value: 0 };
    // let idx = this.uniforms.uIndex;
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 15, 1)
      .name("go to next")
      .onChange(() => {
        // this.goToNext(idx.value);
        this.goToNext(this.uniforms.uIndex.value);
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
