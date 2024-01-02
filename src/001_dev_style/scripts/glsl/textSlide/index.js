import gsap from "gsap/all";

import { Mesh, Vector3, VideoTexture, Group } from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { pointTo, lerp } from "../../helper/utils";
import {
  countUp,
  slideTextIndex,
  getMappedNumber,
} from "../../component/slideIndex";
import { iNode } from "../../helper/iNode";

const textureArray = [];
const $ = {};
let activeIndex = 0;

class ExtendObject extends CustomObject {
  setupTimeline() {
    // console.log("setupTimeline");
    // document.addEventListener("mousemove", this.handleMousemove.bind(this));
    document.addEventListener("click", this.handleClick.bind(this));
  }

  handleMousemove(event) {
    const mouseX = event.clientX / window.innerWidth;
    if (mouseX > 0.5) {
      this.resumeTimeline();
    } else {
      this.pauseTimeline();
    }
  }
  handleClick() {
    if (this.timeline.paused()) {
      this.resumeTimeline();
    } else {
      this.pauseTimeline();
    }
  }

  pauseTimeline() {
    this.timeline.pause();
  }

  resumeTimeline() {
    // console.log("resumeTimeline");
    // console.log(this.timeline);
    if (!this.timeline.isActive()) {
      this.timeline.resume();
    }
  }

  before() {
    // this.timeline = gsap.timeline();
    this.radius = this.rect.width;
    this.rotateAxis = new Vector3(0, 1, 0);
    this.differenceRadius = 0;
    this.activeIndex = 0;
    this.scale = 1;

    this.texes.forEach((tex) => {
      const texData = tex.source.data;
      if (tex.source.data instanceof HTMLVideoElement) {
        tex.source.data.pause?.();
      } else if (Array.isArray(texData) && texData.length > 0) {
        console.log("a", texData[0]);
      }
    });
  }

  _test() {
    const texArray = [...this.texes.values()];
    const _size = texArray.length * 2;
    $.circles = iNode.qsa(".circle");
    $.circles.forEach((circle, index) => {
      circle.addEventListener("click", () => {
        activeIndex = index;
        this.updateCircleColors(activeIndex);

        // console.log("click", index);
        this.uniforms.uProgress.value = 1;

        const progress = (index + 1) / _size;
        // console.log(progress);
        this.timeline.progress(progress);

        // this.uniforms.uIndex.value = Math.floor(progress * _size);
        // this.uniforms.uActiveIndex.value = Math.floor(progress * (_size - 1));

        const mindex = Math.floor(progress * (_size - 1));
        this.uniforms.uIndex.value = this.goToNextSlide(mindex);
        const mappedNumber = getMappedNumber(mindex);
        this.uniforms.uActiveIndex.value = mappedNumber;

        this.timeline.pause();
      });
    });
  }

  updateCircleColors(activeIndex) {
    $.circles.forEach((circle, index) => {
      circle.style.backgroundColor = index === activeIndex ? "white" : "gray";
    });
  }

  fixGsap() {
    let _index = 0;
    const texArray = [...this.texes.values()];
    // console.log(texArray);
    const _size = texArray.length * 2;

    this.timeline = gsap.timeline({
      repeat: -1,
      // onUpdate: () => {
      //   this.updateCircleColors(_index);
      //   this.timeline.restart();
      // },
      // onComplete: () => {
      //   this.timeline.restart();
      // },
    });
    const isLastIndex = _index === _size - 1;

    for (let i = 0; i < _size; i++) {
      let _index = i;
      this.timeline.to([this.uniforms.uProgress, this.uniforms.uProgress2], {
        value: 1,
        duration: _index % 2 === 0 ? 1.0 : 5.0,
        ease: "ease",
        onComplete: () => {
          this.uniforms.uIndex.value = this.goToNextSlide(_index);
          const mappedNumber = getMappedNumber(_index);
          this.uniforms.uActiveIndex.value = mappedNumber;
          // console.log(mappedNumber, "evenIdx");
          this.uniforms.uProgress.value = 0;

          if (_index % 2 === 1) {
            this.uniforms.uProgress2.value = 0;
          }

          if (isLastIndex) {
            gsap.globalTimeline.getChildren().forEach((tween) => {
              this.timeline.pause();
            });
          }
        },
      });
    }
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
    // uniforms.uActiveIndex = { value: 0.0 };
    uniforms.scale = { value: this.scale };
    uniforms.uIndex = { value: 0.0 };
    // uniforms.evenIdx = { value: 0.0 };
    uniforms.uTest = { value: 1.0 };
    uniforms.uResetAlpha = { value: 1.0 };
    uniforms.uProgress2 = { value: 0.0 };

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
      planeMat.uniforms.uProgress2 = this.uniforms.uProgress2;
      planeMat.uniforms.uResolution = this.uniforms.uResolution;

      const planeGeo = this.geometry.clone();
      const plane = new Mesh(planeGeo, planeMat);

      // console.log(plane);
      group.add(plane);

      _index--;
    });

    this.slides = Array.from(group.children);

    // console.log(this.slides);
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
    // console.log("before", uIndex);
    uIndex++;
    // console.log("after", uIndex);
    return uIndex;
    // this.fixGsap(uIndex);
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
    const updateSlideIndex = (index) => {
      this.uniforms.uIndex.value = index;
      this.goToNext(index);
      // this.goToNextSlide(index);
    };
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 15, 1)
      .name("Index")
      .listen()
      .onChange((index) => {
        updateSlideIndex(index);
      });
    toFolder
      .add(this.uniforms.uActiveIndex, "value", 0, 15, 1)
      .name("uActiveIndex")
      .listen()
      .onChange((index) => {
        updateSlideIndex(index);
      });

    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
      .name("uProgress")
      .listen();
    toFolder
      .add(this.uniforms.uProgress2, "value", 0, 1, 0.01)
      .name("uProgress2")
      .listen();
    toFolder
      // .add(this.uniforms.uIndex, "value", 0, 8, 1)
      .add({ goToNext: this.uniforms.uIndex.value }, "goToNext", 0, 15, 1)
      .name("go to next")
      .onChange(() => {
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
