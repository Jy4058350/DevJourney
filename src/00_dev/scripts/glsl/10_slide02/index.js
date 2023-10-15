import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { startGsapAnimation, gsapActive } from "../../helper";

class ExtendObject extends CustomObject {
  fixGsap() {
    // gsapActive();
    // return gsap;

    const tl = new gsap.timeline();
    tl.to(this.uniforms.uIndex, {
      value: 0.0,
      duration: 3.0,
      ease: "ease",
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 1.0;
        console.log(this.uniforms.uTick.value);
      },
    });

    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 10.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 2.0;
        this.uniforms.uProgress.value = 0.0;
        this.uniforms.uProgress1.value = 0.0;
        console.log(this.uniforms.uTick.value);
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 3.0;
        // this.uniforms.uProgress1.value = 0.0;
        console.log(this.uniforms.uTick.value);
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 10.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 4.0;
        this.uniforms.uProgress.value = 0.0;
        console.log(this.uniforms.uTick.value);
      },
    });
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uProgress1 = { value: 0 };
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
      .add(this.uniforms.uIndex, "value", 0, 5, 1)
      .name("uIndex")
      .listen();
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("uProgress")
      .listen();
    toFolder
      .add(this.uniforms.uProgress1, "value", 0, 1, 0.1)
      .name("uProgress1")
      .listen();

    const datData = { next: !!this.uniforms.uProgress.value };
    toFolder.add(datData, "next").onChange(() => {
      gsap.to(this.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 2.0,
        ease: "none",
      });
    });
  }
}

export default ExtendObject;
