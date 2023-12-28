import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });

    console.log(el);

    el.addEventListener("mouseenter", () => {
      console.log("mouse entered");
      gsap.to(this.uniforms.uProgress, {
        value: 1,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("Animation commpleted");
          console.log(
            "uProgress value after animation",
            this.uniforms.uProgress.value
          );
        },
      });
    });
    el.addEventListener("mouseleave", () => {
      console.log("mouse leaved");
      gsap.to(this.uniforms.uProgress, {
        value: 0,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("Animation commpleted");
          console.log(
            "uProgress value after animation",
            this.uniforms.uProgress.value
          );
        },
      });
    });
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uTest = { value: 1.0 };
    uniforms.uRaito = { value: 0.1 };
    uniforms.uProgress = { value: 0.0 };
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
