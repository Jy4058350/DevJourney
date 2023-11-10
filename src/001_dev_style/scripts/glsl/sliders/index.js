import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { countUp, slideTextIndex } from "../../component/slideIndex";

let slideIndex = 0;
let _size = 0;

class ExtendObject extends CustomObject {
  afterInit() {
    this.pauseVideo();
    setTimeout(() => {
      this.playVideo();
    }, 2500);
  }
  fixGsap() {
    _size = this.texes.size;
    let index = countUp(this.uniforms.uIndex.value, _size);
    const texesArray = Array.from(this.texes);
    // console.log(texesArray[0]);
    const tl = new gsap.timeline();
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: index % 2 === 0 ? 5.0 : 1.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = slideTextIndex(index);
        this.uniforms.uProgress.value = 0.0;
        slideIndex++;
        this.fixGsap(index);
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
