import gsap from "gsap";
import { Mesh, Vector3, VideoTexture, Group } from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { pointTo, lerp } from "../../helper/utils";
import {
  countUp,
  slideTextIndex,
  // updateSlideIndex,
  calculateEvenNumber,
} from "../../component/slideIndex";

let _slideIndex = 0;
let _size = 0;

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
    _size = this.texes.size;

    // console.log(this.uniforms.uResetAlpha.value);
    let _index = countUp(this.uniforms.uIndex.value, _size);
    // console.log("index", _index);
    // console.log("this.uniforms.uindex.value", this.uniforms.uIndex.value);

    const isLastIndex = _index === _size - 1;

    const tl = new gsap.timeline();
    tl.to(this.uniforms.uProgress, {
      // tl.to(this.uniforms.uIndex, {
      value: 1.0,
      duration: _index % 2 === 0 ? 2.0 : 1.0,
      ease: "ease",
      onComplete: () => {
        const evenIdx = calculateEvenNumber(_index);
        this.uniforms.uIndex.value = slideTextIndex(_index);
        console.log("textSlide.uniforms.uIndex.value", this.uniforms.uIndex.value);
        this.uniforms.evenIdx.value = evenIdx;
        // console.log("evenIdx", evenIdx);

        this.fixGsap(_index);

        this.goToNext(slideTextIndex(evenIdx));
        // this.goToNext(slideTextIndex(evenIdx + 1));
        if (isLastIndex) {
          console.log("last index");
        }
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
    uniforms.evenIdx = { value: 0.0 };
    uniforms.uTest = { value: 1.0 };
    uniforms.uResetAlpha = { value: 1.0 };

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

    let _index = 0;

    this.texes.forEach((tex) => {
      const planeMat = this.material.clone();
      planeMat.uniforms.tex1 = { value: tex };
      planeMat.side = 2;
      planeMat.uniforms.uSlideIndex.value = _index;
      planeMat.uniforms.uActiveIndex = this.uniforms.uActiveIndex;
      planeMat.uniforms.uTick = this.uniforms.uTick;
      planeMat.uniforms.uProgress = this.uniforms.uProgress;
      planeMat.uniforms.uResolution = this.uniforms.uResolution;
      // console.log(planeMat.uniforms.uResolution);

      const planeGeo = this.geometry.clone();
      const plane = new Mesh(planeGeo, planeMat);

      // console.log(plane);
      group.add(plane);

      _index--;
    });

    this.slides = Array.from(group.children);

    // console.log(group);
    return group;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  goToNext(_slideIndex) {
    this.differenceRadius -=
      // ((_slideIndex - this.activeIndex) * 2 * Math.PI) / this.slides.length;
      (-1 * (_slideIndex - this.activeIndex) * 2 * Math.PI) /
      this.slides.length;
    // console.log("this.differenceRadius", this.differenceRadius);
    this.activeIndex = _slideIndex;
    // console.log("this.activeIndex", this.activeIndex);
    this.playVideo(_slideIndex);
  }

  goToNextSlide(uIndex) {
    uIndex++;
    this.fixGsap(uIndex);
  }

  render(tick) {
    super.render(tick);
    if (this.differenceRadius === 0) return;

    const uActiveIndex = this.uniforms.uActiveIndex.value;
    const _index = lerp(uActiveIndex, this.activeIndex, 0.05, 0.005);
    this.uniforms.uActiveIndex.value = _index;
  }

  playVideo(_index) {
    const i = _index % this.slides.length;
    const slide = this.slides.at(i);

    this.playingVideo?.pause?.();
    // console.log(this.playingVideo);
    if (
      slide.material.uniforms.tex1.value.source.data instanceof HTMLVideoElement
    ) {
      this.playInterval = setInterval(() => {
        if (this.uniforms.uActiveIndex.value === _index) {
          this.playingVideo = slide.material.uniforms.tex1.value.source.data;
          this.playingVideo.play?.();
          clearInterval(this.playInterval);
        }
      }, 200);
    }
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 5, 1)
      .name("uIndex")
      .listen();
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
      .name("uProgress")
      .listen();
    // const idx = { value: 0 };
    // let idx = this.uniforms.uIndex;
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 5, 1)
      .name("go to next")
      .onChange(() => {
        // this.goToNext(idx.value);
        // this.goToNext(this.uniforms.uIndex.value);
        this.goToNextSlide(this.uniforms.uIndex.value);
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
