import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

import { CustomObject } from "../CustomObject";
import world from "../world";

class ExtendObject extends CustomObject {
  constructor({ texes, el, type, canvasRect, program }) {
    super({ texes, el, type, canvasRect });
    // let textureMap = new Map();
    // textureMap.set("tex1", texes.get("tex1"));
    // textureMap.set("tex2", texes.get("tex2"));

    // let texturesArray = Array.from(textureMap.values());
    // let gl = world.renderer.getContext();

    // let vertexShaderCode = this.fixVertex();
    // let fragmentShaderCode = this.fixFragment();
    // let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    // let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // gl.shaderSource(vertexShader, vertexShaderCode);
    // gl.shaderSource(fragmentShader, fragmentShaderCode);
    // gl.compileShader(vertexShader);
    // gl.compileShader(fragmentShader);
    // if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    //   console.error(
    //     "Error compiling vertex shader:",
    //     gl.getShaderInfoLog(vertexShader)
    //   );
    // }
    // if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    //   console.error(
    //     "Error compiling fragment shader:",
    //     gl.getShaderInfoLog(fragmentShader)
    //   );
    // }

    // for (let i = 0; i < texturesArray.length; i++) {
    //   let texture = gl.createTexture();
    //   gl.bindTexture(gl.TEXTURE_2D, texture);
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    //   let image = new Image();
    //   image.onload = function () {
    //     gl.bindTexture(gl.TEXTURE_2D, texture);
    //     gl.texImage2D(
    //       gl.TEXTURE_2D,
    //       0,
    //       gl.RGBA,
    //       gl.RGBA,
    //       gl.UNSIGNED_BYTE,
    //       image
    //     );
    //   };
    //   image.src = texturesArray[i];

    //   gl.activeTexture(gl.TEXTURE0);
    //   gl.bindTexture(gl.TEXTURE_2D, texture);

    //   let u_imageLocation = gl.getUniformLocation(program, "u_image");
    //   gl.uniform1i(u_imageLocation, 0 + i);
    // }

    // let textureUnits = [0, 1];
    //   for (let i = 0; i < texturesArray.length; i++) {
    //     let webglTexture = texturesArray[i].texture;
    //     gl.activeTexture(gl.TEXTURE0 + textureUnits[i]);
    //     gl.bindTexture(gl.TEXTURE_2D, webglTexture[i]);
    //   }
  }

  convertMapToArray(texes) {
    console.log(this.$.el);
    console.log(texes);
    const targetEl = iNode.qs(".fv-test-shader");

    // Ensure this.uniforms.textures.value is an array
    this.uniforms.textures = this.uniforms.textures || { value: [] };

    // Clear the array
    this.uniforms.textures.value = [];

    // Add each texture from the map to the array

    if (texes[0]) {
      for (let [key, value] of texes) {
        this.uniforms.textures.value.push(value);
        console.log(key, value);
      }
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
