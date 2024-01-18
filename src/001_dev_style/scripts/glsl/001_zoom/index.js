import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
    // console.log(el);
    // el.addEventListener("mouseenter", () => {
    //   gsap.to(this.uniforms.uProgress, {
    //     value: 1,
    //     duration: 2,
    //     ease: "power2.inOut",
    //     onComplete: () => {},
    //   });
    // });
    // el.addEventListener("mouseleave", () => {
    //   gsap.to(this.uniforms.uProgress, {
    //     value: 0,
    //     duration: 2,
    //     ease: "power2.inOut",
    //     onComplete: () => {},
    //   });
    // });
  }

  _test() {
    // console.log("test");
    const el = this.$.el;
    // console.log(el);
    el.addEventListener("mouseenter", () => {
      gsap.to(this.uniforms.uProgress, {
        value: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {},
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(this.uniforms.uProgress, {
        value: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {},
      });
    });
  }

  disv() {
    this.$.el.draggable = false;
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uTest = { value: 1.0 };
    uniforms.uRaito = { value: 0.3 };
    // uniforms.uProgress = { value: 0.0 };
    console.log(uniforms.uProgress);
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
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      // .add(this.uniforms.uHover, "value", 0, 1, 0.1)
      .name("progess")
      .listen();
    toFolder
      .add(this.uniforms.uTick, "value", 0, 1, 0.1)
      // .add(this.uniforms.uHover, "value", 0, 1, 0.1)
      .name("tick")
      .listen();
    toFolder
      .add(this.uniforms.uRaito, "value", 0, 1, 0.1)
      // .add(this.uniforms.uHover, "value", 0, 1, 0.1)
      .name("raito")
      .listen();

    const datData = { next: !!this.uniforms.uProgress.value };
    // const datData = { next: !!this.uniforms.uHover.value };
    toFolder.add(datData, "next").onChange(() => {
      gsap.to(this.uniforms.uProgress, {
        // gsap.to(this.uniforms.uHover, {
        value: +datData.next,
        duration: 2,
        ease: "power2.inOut",
      });
    });
  }
}

export default ExtendObject;
