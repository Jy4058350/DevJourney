import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import world from "../world";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });
    let textureMap = new Map();
    textureMap.set("tex1", texes.get("tex1"));
    textureMap.set("tex2", texes.get("tex2"));

    let texturesArray = Array.from(textureMap.values());
    let gl = world.renderer.getContext();

    let textureUnits = [0, 1];
    
    for (let i = 0; i < texturesArray.length; i++) {
      let webglTexture = texturesArray[i].texture;
      gl.activeTexture(gl.TEXTURE0 + textureUnits[i]);
      gl.bindTexture(gl.TEXTURE_2D, webglTexture[i]);
    }
  }

  // fixGsap() {
  //   this.timeline.to(this.uniforms.uProgress, {
  //     value: 1,
  //     duration: 2,
  //     ease: "none",
  //     repeat: -1,
  //     onUpdate: () => {
  //       if (
  //         Math.abs(
  //           this.uniforms.uProgress.value -
  //             Math.floor(this.uniforms.uProgress.value)
  //         ) < 0.01
  //       ) {
  //         this.uniforms.uProgress.value = 0;
  //         this.uniforms.uIndex.value += 1;
  //         // console.log("onComplete");
  //         // console.log(this.uniforms.uIndex.value);
  //       }
  //     },
  //   });
  // }

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
