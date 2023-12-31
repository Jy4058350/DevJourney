import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { countUpSlide } from "../../component/slideIndex";
import { VideoTexture } from "three";
import { iNode } from "../../helper/iNode";

const videoNum = [];
const $ = {};
let activeIndex = 0;
// const totalSlides = 16;
let circleClickedCondition = false;

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

        this.uniforms.uIndex.value = Math.floor(progress * _size);
        console.log(this.uniforms.uIndex.value);
        this.timeline.pause();
      });
    });
  }

  updateCircleColors(activeIndex) {
    $.circles.forEach((circle, index) => {
      circle.style.backgroundColor =
        index === activeIndex ? "white" : "transparent";
    });
  }

  fixGsap() {
    // console.log(uIndex);
    let _index = 0;
    const texArray = [...this.texes.values()];
    const _size = texArray.length * 2;

    for (let i = 0; i < _size; i++) {
      let _index = i;
      this.timeline.to(this.uniforms.uProgress, {
        value: 1,
        duration: _index % 2 === 0 ? 2.0 : 5.0,
        // duration: i % 2 === 0 ? 2.0 : 5.0,
        ease: "ease",
        onComplete: () => {
          // console.log(_index);
          // console.log("Slide transition completed");
          this.uniforms.uIndex.value = this.goToNextSlide(_index);
          this.uniforms.uProgress.value = 0;
          this.updateCircleColors(_index);

          const isLastIndex = _index === _size - 1;

          if (isLastIndex) {
            gsap.globalTimeline.getChildren().forEach((timeline) => {
              this.uniforms.uIndex.value = 0;
              this.timeline.restart();

              // console.log("pause");
            });
          }
        },
      });
    }
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

  goToNextSlide(uIndex) {
    // console.log("before", uIndex);
    uIndex++;
    // console.log("after", uIndex);
    return uIndex;
    // this.fixGsap(uIndex);
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
