import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { startGsapAnimation, gsapActive } from "../../helper";

class ExtendObject extends CustomObject {
  fixGsap() {
    const tl = new gsap.timeline();
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 1.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uProgress.value = 0.0;
        this.uniforms.uIndex.value = 1.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 2.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 1.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uProgress.value = 0.0;
        this.uniforms.uIndex.value = 3.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 0.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.xOffset = { value: 0.2 };
    uniforms.yOffset = { value: 0.2 };
    uniforms.radius = { value: 0.3 };
    uniforms.radius1 = { value: 0.35 };
    uniforms.uIndex = { value: 0.0 };
    uniforms.uRaito = { value: 0.1 };

    startGsapAnimation(uniforms);
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
      .add(this.uniforms.uIndex, "value", 0, 8, 1)
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

export default ExtendObject;
