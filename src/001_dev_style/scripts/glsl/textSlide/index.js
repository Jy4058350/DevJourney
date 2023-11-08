import gsap from "gsap";
import {
  Mesh,
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
  // updateSlideIndex,
  TextIndex,
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
        let tIdx = TextIndex(index);
        // console.log(index);
        // console.log(tIdx);
        this.uniforms.uIndex.value = slideTextIndex(index);
        this.uniforms.tIndex.value = tIdx;
        this.uniforms.uProgress.value = 0.0;
        slideIndex++;
        this.fixGsap(index);
        this.goToNext(slideTextIndex(tIdx));
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
    uniforms.tIndex = { value: 0.0 };

    return uniforms;
  }

  fixTexes(u) {
    return u;
  }

  fixGeometry() {
    const geo = super.fixGeometry();
    // geo.scale(0.5, 0.5, 0.5);
    geo.translate(0, 0, 10.0);

    return geo;
  }

  fixMesh() {
    const group = new Group();
   
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

   

    const uActiveIndex = this.uniforms.uActiveIndex.value;
    const index = lerp(uActiveIndex, this.activeIndex, 0.05, 0.005);
    this.uniforms.uActiveIndex.value = index;
   
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
