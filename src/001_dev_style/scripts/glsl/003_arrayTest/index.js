import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
  }

  fixGsap() {
    this.timeline.to(this.uniforms.uProgress, {
      value: 1,
      duration: 2,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        if (
          Math.abs(
            this.uniforms.uProgress.value -
              Math.floor(this.uniforms.uProgress.value)
          ) < 0.01
        ) {
          console.log("onComplete");
          this.uniforms.uProgress.value = 0;
          this.uniforms.uIndex.value += 1;
          console.log(this.uniforms.uIndex.value);
        }
      },
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

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uIndex, "value", 0, 10, 1)
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
