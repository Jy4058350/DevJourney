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
      duration: 15.0,
      ease: "ease",
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 1.0;
      },
    });

    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 2.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 3.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 4.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 5.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 6.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 7.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 8.0;
        this.uniforms.uProgress.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 9.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 10.0;
        this.uniforms.uProgress.value = 0.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 11.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress1, {
      value: 1.0,
      duration: 15.0,
      // ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 12.0;
        this.uniforms.uProgress.value = 0.0;
        this.uniforms.uProgress1.value = 0.0;
      },
    });
    tl.to(this.uniforms.uProgress, {
      value: 1.0,
      duration: 3.0,
      ease: "ease",
      onComplete: () => {
        this.uniforms.uIndex.value = 0.0;
        this.uniforms.uProgress1.value = 0.0;
        this.fixGsap();
      },
    });
  }

  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uProgress1 = { value: 0 };
    uniforms.uSpeed = { value: 1.0 };
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
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("uProgress")
      .listen();
    toFolder
      .add(this.uniforms.uProgress1, "value", 0, 1, 0.1)
      .name("uProgress1")
      .listen();
    toFolder
      .add(this.uniforms.uSpeed, "value", 1, 5, 0.1)
      .name("uSpeed")
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
