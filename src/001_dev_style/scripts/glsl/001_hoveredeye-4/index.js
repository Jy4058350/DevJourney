import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { loader } from "../../component/loader";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  static async init({ el, type }) {
    const texes = await loader.texMap(el);
    const i = new this({ texes, el, type });
    return i;
  }
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });

    this.slideIndex = null;
    window.addEventListener("slideChange", (event) => {
      const currentIndex = event.detail; // 目的1のための数値
      this.uniforms.uProgress.value = 0;
      if (currentIndex === 4 || currentIndex === 0) {
        this.fixGsap(currentIndex);
      }
      if (currentIndex === 5 || currentIndex === 1) {
        this.uniforms.uProgress.value = 0;
      }
    });
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  style() {
    this.$.el.style.opacity = 1.0;
  }

  fixGsap(index) {
    this.uniforms.uProgress.value = 0;
    this.timeline.to(this.uniforms.uProgress, {
      value: 1,
      duration: 1,
      ease: "power2.inOut",
    });
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 15, 1)
      .name("uIndex-3")
      .listen();
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.01)
      .name("uProgress")
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

export default ExtendObject;
