import SlideIndexManager from "../../myclasses/slideIndexManager";
import gsap from "gsap";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { loader } from "../../component/loader";
import { iNode } from "../../helper";

import { CustomObject } from "../CustomObject";

class ExtendObject extends CustomObject {
  static async init({ el, type }) {
    const texes = await loader.texMap(el);
    const i = new this({ texes, el, type });
    return i;
  }
  constructor({ texes, el, type, canvasRect }) {
    super({ texes, el, type, canvasRect });

    const sliders = iNode.qs(".rotation-slider");
    const prevButton = iNode.qs(".home-news-control-button.Previous");
    const nextButton = iNode.qs(".home-news-control-button.Next");

    window.addEventListener("slideChange", (event) => {
      let currentIndex = SlideIndexManager.getIndex();
      if (currentIndex === 2 || currentIndex === 6) {
        console.log(this.uniforms.uProgress.value);
        this.uniforms.uProgress.value = 1.0;
        console.log(this.uniforms.uProgress.value);
      } else {
        this.uniforms.uProgress.value = 0.0;
      }
    });
  }

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
      .add(this.uniforms.uIndex, "value", 0, 15, 1)
      .name("uIndex-1")
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
