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
      this.slideIndex = event.detail;
      console.log("Slide changed to: ", +this.slideIndex);
      this.fixGsap();
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

  fixGsap() {
    this.timeline.to(this.uniforms.uProgress, {
      value: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("Slide transition completed");
      },
    });
  }
}

export default ExtendObject;
