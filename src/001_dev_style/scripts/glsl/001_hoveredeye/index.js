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
      const newIndex = event.detail;
      this.slideIndex = newIndex;
      console.log(newIndex);
      console.log(this.slideIndex);
      this.fixGsap(newIndex);
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
    // console.log("this.slideIndex", this.slideIndex);
    // console.log("index", index);
    this.uniforms.uProgress.value = 0;
    this.timeline.to(this.uniforms.uProgress, {
      value: 1,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (this.slideIndex !== index) {
          // console.log("onUpdate");
          this.uniforms.uProgress.value = 0;
        }
      },

      onComplete: () => {
        if (this.slideIndex === index) {
          // console.log("onComplete");
          this.uniforms.uProgress.value = 1;
        }
        if (this.slideIndex !== index) {
          this.uniforms.uProgress.value = 0;
        }
      },
    });
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
