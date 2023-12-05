import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { countUpSlide } from "../../component/slideIndex";
import { VideoTexture } from "three";

let slideIndex = 0;
const videoNum = [];

class ExtendObject extends CustomObject {
  setupTimeline() {
    // console.log("setupTimeline");
    document.addEventListener("mousemove", this.resumeTimeline.bind(this));
  }

  pauseTimeline() {
    this.timeline.pause();
  }

  resumeTimeline() {
    console.log("resumeTimeline");
    console.log(this.timeline);
    this.timeline.resume();
  }

  before(uniforms) {
    if (videoNum instanceof HTMLVideoElement) {
      console.log("play");
    }
    this.pauseVideo();
    const texArray = Array.from(this.texes);
    texArray.forEach((entry) => {
      const [key, value] = entry;
      videoNum.push(value);
    });
  }

  playVideo() {
    const slideIndex = this.uniforms.uIndex.value;

    this.pauseVideo();
    this.texes.forEach((tex) => {
      if (tex.source.data instanceof HTMLVideoElement) {
        const videoIndex = Math.floor(slideIndex - 1) / 2;
        if (videoNum[videoIndex] instanceof VideoTexture) {
          videoNum[videoIndex].source.data.play();
        }
      }
    });
  }
  pauseVideo() {
    this.texes.forEach((tex) => {
      if (tex.source.data instanceof HTMLVideoElement) {
        tex.source.data.pause();
      }
    });
  }

  fixGsap() {
    this.timeline = gsap.timeline();
    const _size = this.texes.size * 2;
    // console.log(_size, "_size");
    const isLastIndex = slideIndex === _size - 1;
    // console.log(isLastIndex, "isLastIndex");
    const pauseIndex = slideIndex === _size - 13;
    // console.log(pauseIndex, "pauseIndex");
    this.playVideo();
    slideIndex = countUpSlide(this.uniforms.uIndex.value, _size);
    const tl = new gsap.timeline();

    this.timeline.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: slideIndex % 2 === 0 ? 2.0 : 1.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = slideIndex;
        this.uniforms.uProgress.value = 0.0;
        slideIndex++;
        this.fixGsap();

        if (isLastIndex) {
          console.log("Stopping slides at the last index");
          console.log("pauseSlide", isLastIndex)
          gsap.globalTimeline.getChildren().forEach((timeline) => {
            this.timeline.pause();
          });
          // this.timeline.progress(1);
        }
        // if (pauseIndex) {
        //   console.log("pauseSlide", pauseIndex);
        //   gsap.globalTimeline.getChildren().forEach((timeline) => {
        //     this.timeline.pause();
        //   });
        // }
      },
    });
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.xOffset = { value: 0.2 };
    uniforms.yOffset = { value: 0.2 };
    uniforms.radius = { value: 0.3 };
    uniforms.radius1 = { value: 0.38 };
    uniforms.uIndex = { value: 0.0 };
    uniforms.uRaito = { value: 0.1 };
    uniforms.uTest = { value: 1.0 };

    return uniforms;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
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
    toFolder
      .add(this.uniforms.xOffset, "value", 0, 1, 0.1)
      .name("xOffset")
      .listen();
    toFolder
      .add(this.uniforms.yOffset, "value", 0, 1, 0.1)
      .name("yOffset")
      .listen();
    toFolder
      .add(this.uniforms.uRaito, "value", 0.1, 1, 0.1)
      .name("uRaito")
      .listen();
    toFolder
      .add(this.uniforms.uTest, "value", 1.0, 2, 0.1)
      .name("uTest")
      .listen();

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
// export const uIndexValue = this.uniforms.uIndex.value;
export default ExtendObject;
