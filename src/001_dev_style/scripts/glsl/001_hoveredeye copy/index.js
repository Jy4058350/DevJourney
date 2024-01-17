import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

window.addEventListener("slideChange", (event) => {
  console.log("Slide changed to: ", +event.detail);
});

class ExtendObject extends CustomObject {
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
