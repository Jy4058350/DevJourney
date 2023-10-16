import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { startGsapAnimation, gsapActive } from "../../helper";

class ExtendObject extends CustomObject {
  fixGsap() {}

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
