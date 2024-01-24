import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import { iNode } from "../../helper";
import world from "../world";
import { loader } from "../../component/loader";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect, program }) {
    super({ texes, el, type, canvasRect });
    this.convertMapToArray(texes);

    const texture1 = loader.getTexture("/img/output6.jpg");
    const texture2 = loader.getTexture("/img/output7.jpg");
    const textures = [texture1, texture2];
    console.log(textures);
    this.setTextureIndex(1);
  }

  setTextureIndex(index) {
    this.uniforms.uIndex.value = index;
  }

  convertMapToArray(texes) {
    // console.log(this.$.el);
    // console.log(texes);
    const targetEl = iNode.qs(".fv-test-shader");

    // Ensure this.uniforms.textures.value is an array
    this.uniforms.textures = this.uniforms.textures || { value: [] };

    // Clear the array
    this.uniforms.textures.value = [];

    // Add each texture from the map to the array

    for (let [key, value] of texes) {
      this.uniforms.textures.value.push(value);
      // console.log(key, value);
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
