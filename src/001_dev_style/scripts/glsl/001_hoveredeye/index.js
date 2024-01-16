import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { loader } from "../../component/loader";

import { CustomObject } from "../CustomObject";



class ExtendObject extends CustomObject {
  static async init({ el, type }) {
    const texes = await loader.texMap(el);

    const i = new this({ texes, el, type });
    console.log(i);
    return i;
  }
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
    // this.texes = texes ?? new Map();
    // this.$ = { el };
    // this.type = type;
    // this.canvasRect = canvasRect;
    this.slideIndex = null;
    window.addEventListener("slideChange", (event) => {
      this.slideIndex = event.detail;
      console.log("Slide changed to: ", +this.slideIndex);
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
}

export default ExtendObject;
