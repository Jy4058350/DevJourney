import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import {
  countUp,
  slideTextIndex,
  updateSlideIndex,
} from "../../component/slideIndex";
import { VideoTexture } from "three";

let slideIndex = 0;
const videoNum = [];

class ExtendObject extends CustomObject {
  before(uniforms) {
    // console.log(videoNum);
    if (videoNum instanceof HTMLVideoElement) {
      console.log("play");
    }
    // console.log(this.uniforms);
    // console.log(uniforms.uIndex.value);
    this.pauseVideo();
    const texArray = Array.from(this.texes);
    //  console.log(texArray);
    texArray.forEach((entry) => {
      const [key, value] = entry;
      // console.log(key, value);
      videoNum.push(value);
      console.log(videoNum[7] instanceof VideoTexture);
    });
  }

  playVideo(uIndex) {
    const slideIndex = this.uniforms.uIndex.value;
    // console.log(slideIndex);
    console.log(videoNum);

    this.pauseVideo();
    this.texes.forEach((tex) => {
      if (tex.source.data instanceof HTMLVideoElement) {
        // tex.source.data.play();

        if (slideIndex === 1) {
          if (videoNum[0] instanceof VideoTexture) {
            videoNum[0].source.data.play();
          }
        }
        if (slideIndex === 3) {
          if (videoNum[1] instanceof VideoTexture) {
            videoNum[1].source.data.play();
          }
        }
        if (slideIndex === 5) {
          if (videoNum[2] instanceof VideoTexture) {
            videoNum[2].source.data.play();
          }
        }
        if (slideIndex === 7) {
          if (videoNum[3] instanceof VideoTexture) {
            videoNum[3].source.data.play();
          }
        }
        if (slideIndex === 9) {
          if (videoNum[4] instanceof VideoTexture) {
            videoNum[4].source.data.play();
          }
        }
        if (slideIndex === 11) {
          if (videoNum[5] instanceof VideoTexture) {
            videoNum[5].source.data.play();
          }
        }
        if (slideIndex === 13) {
          if (videoNum[6] instanceof VideoTexture) {
            videoNum[6].source.data.play();
          }
        }
        if (slideIndex === 15) {
          if (videoNum[7] instanceof VideoTexture) {
            videoNum[7].source.data.play();
          }
        }
        if (slideIndex === 17) {
          if (videoNum[8] instanceof VideoTexture) {
            videoNum[8].source.data.play();
          }
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

  goToNext(index) {}

  fixGsap() {
    this.playVideo(slideIndex);
    slideIndex = countUp(this.uniforms.uIndex.value, this.texes.size);
    const tl = new gsap.timeline();
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: slideIndex % 2 === 0 ? 2.0 : 1.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = slideIndex;
        this.uniforms.uProgress.value = 0.0;
        slideIndex++;
        this.fixGsap(slideIndex);
        // console.log(slideIndex);
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
