import { Vector2, ClampToEdgeWrapping, MirroredRepeatWrapping } from "three";
import { gsap } from "gsap";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  fixUniforms() {
    const uniforms = super.fixUniforms();
    uniforms.uNoiseScale = { value: new Vector2(2, 2) };

    return uniforms;
  }

  fixTexes(u) {
    this.texes.forEach((tex, key) => {
      u[key] = { value: tex };
      const customTex = tex.clone();
      customTex.wrapS = ClampToEdgeWrapping;
      customTex.wrapT = MirroredRepeatWrapping;
    });
    return u;
  }

  fixVertex() {
    return vertexShader;
  }

  fixFragment() {
    return fragmentShader;
  }

  debug(toFolder) {
    toFolder
      .add(this.uniforms.uNoiseScale.value, "x", 0, 10, 0.1)
      .name("x")
      .listen();
    toFolder
      .add(this.uniforms.uNoiseScale.value, "y", 0, 10, 0.1)
      .name("y")
      .listen();
    toFolder
      .add(this.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("value")
      .listen();
    const datData = { next: !!this.uniforms.uProgress.value };
    toFolder.add(datData, "next").onChange(() => {
      gsap.to(this.uniforms.uProgress, {
        value: +datData.next,
        duration: 2,
        ease: "power2.inOut",
      });
    });
  }
}

export default ExtendObject;
