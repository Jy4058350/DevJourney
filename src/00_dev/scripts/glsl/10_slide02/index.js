import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { startGsapAnimation } from "../../helper";

class ExtendObject extends CustomObject {
  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uIndex = { value: 0 };
    console.log(uniforms);
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
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("uProgress")
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
