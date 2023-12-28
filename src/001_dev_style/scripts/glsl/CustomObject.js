import gsap from "gsap";

import {
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
  Vector4,
  DoubleSide,
  TextureLoader,
} from "three";

import { loader } from "../component/loader";
import { getWorldPosition, getResolution } from "../helper/utils";
import { setAspectRatio } from "../component/setaspectratio";

class CustomObject {
  static async init({ el, type }) {
    // console.log(el);
    const texes = await loader.texMap(el);
    // console.log(texes);

    const i = new this({ texes, el, type });
    // console.log(i);
    return i;
  }

  constructor({ texes, el, type, canvasRect }) {
    this.$ = { el };
    this.texes = texes ?? new Map();

    this.timeline = gsap.timeline();
    // this.setupTimeline();
    this._test();

    // console.log(el);
    if (!el) {
      console.log("el is null");
      return;
    }
    this.rect = el.getBoundingClientRect();
    if (!this.rect) {
      console.log("rect is null");
      return;
    }

    if (!this.rect.width || !this.rect.height) {
      console.log(this.rect.width, this.rect.height);
      if (window.debug === 1) {
        console.log("non pixel element is detected.");
      }
      return {};
    }
    // console.log(texes.get("tex1"));
    // console.log(texes.get("tex2"));

    if (texes.get("tex1") === null) {
      texes.set("tex1", texes.get("tex2"));
    }
    try {
      this.before = this.before();
      this.defines = this.fixDefines();
      this.uniforms = this.fixUniforms();
      this.uniforms = this.fixTexes(this.uniforms);
      this.uniforms = this.setupResolution(this.uniforms);
      this.gsap = this.fixGsap();
      this.vertexShader = this.fixVertex();
      this.fragmentShader = this.fixFragment();
      this.geometry = this.fixGeometry();
      this.material = this.fixMaterial();
      this.mesh = this.fixMesh();
      this.disv();
      this.style();
      this.convertMapToArray(texes);

      this.mesh.__marker = type;
    } catch (e) {
      if (window.debug === 1) {
        console.log(e);
      }
      return {};
    }

    const { x, y } = getWorldPosition(this.rect, canvasRect);
    if (this.mesh) {
      this.mesh.position.x = x;
      this.mesh.position.y = y;
    }
  }

  _test() {}

  // setupTimeline() {}

  convertMapToArray(texes) {
    // for(let [key, value] of texes) {
    // console.log(key, value);
    // console.log(value);
    // this.uniforms.textures = uniforms.textures || { value: []};
    // this.uniforms.textures.value.push(value);
    // }
    // const arrayFromTexes = Array.from(texes);
    // console.log(arrayFromTexes[0]);
    // console.log(this.uniforms.textures.value[0]);

    for (let i = 0; i < texes.size; i++) {
      this.uniforms.textures.value.push(texes.get(`tex${i + 1}`));
      // console.log(this.uniforms.textures.value[i]);
    }
  }

  before() {}

  fixDefines() {
    return {
      PI: Math.PI,
    };
  }

  disv() {
    this.$.el.draggable = false;
    this.$.el.style.pointerEvents = "none";
  }

  style() {
    this.$.el.style.opacity = 0.0;
  }

  fixTexes(u) {
    this.texes.forEach((tex, key) => {
      u[key] = { value: tex };
    });
    return u;
  }

  fixGeometry() {
    return new PlaneGeometry(this.rect.width, this.rect.height, 1, 1);
  }

  fixMaterial() {
    return new ShaderMaterial({
      defines: this.defines,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      alphaTest: 0.5,
    });
  }

  fixUniforms() {
    return {
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTick: { value: 0 },
      uProgress: { value: 0.0 },
      uIndex: { value: 0 },
      textures: { value: [] },
      uResolution: { value: new Vector4(0, 0, 0, 0) },
    };
  }

  fixGsap() {
    // return {};
  }

  fixVertex() {
    throw new Error("このメソッドはオーバーライドして使用してください。");
  }

  fixFragment() {
    throw new Error("このメソッドはオーバーライドして使用してください。");
  }

  fixMesh() {
    return new Mesh(this.geometry, this.material);
  }

  setupResolution(u) {
    // const rect = el.getBoundingClientRect();
    if (!this.texes.has("tex1")) return u;
    // console.log(this.texes.get("tex1"));

    const texData = this.texes.get("tex1").source.data;
    // console.log(texData.videoWidth, texData.videoHeight);
    // console.log(this.rect.width, this.rect.height);

    let mrect = {};
    if (texData instanceof HTMLImageElement) {
      mrect = {
        width: texData.naturalWidth,
        height: texData.naturalHeight,
      };
    } else if (texData instanceof HTMLVideoElement) {
      mrect = {
        width: texData.videoWidth,
        height: texData.videoHeight,
      };
    }
    // console.log(mrect);

    const resolution = getResolution(this.rect, mrect, this.uniforms);
    // console.log(resolution);

    u.uResolution = { value: resolution };
    // console.log(this.uniforms.uResolution.value);
    // console.log(resolution);
    return u;
  }

  resize(newCanvasRect) {
    const {
      $: { el },
      mesh,
      geometry,
      rect,
      group,
    } = this;
    const nextRect = el.getBoundingClientRect(this.$.el);
    const { x, y } = getWorldPosition(nextRect, newCanvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    // 大きさの変更
    geometry.scale(
      nextRect.width / rect.width,
      nextRect.height / rect.height,
      1
    );
    // console.log(rect.width, rect.height);
    // console.log(nextRect.width, nextRect.height);
    const aspectRw = nextRect.width / rect.width;
    const aspectRh = nextRect.height / rect.height;

    //resizing calcu aspect
    const ResizetexData = this.texes.get("tex1").source.data;

    let ResizeMrect = {};
    if (ResizetexData instanceof HTMLImageElement) {
      ResizeMrect = {
        width: ResizetexData.naturalWidth,
        height: ResizetexData.naturalHeight,
      };
    } else if (ResizetexData instanceof HTMLVideoElement) {
      ResizeMrect = {
        width: ResizetexData.videoWidth,
        height: ResizetexData.videoHeight,
      };
    }
    const ResizeResolution = getResolution(nextRect, ResizeMrect);
    // console.log(ResizeResolution);
    this.uniforms.resolution = { value: ResizeResolution };

    // console.log(this.uniforms.resolution.value);
    // console.log(mesh);

    if (mesh.type === "Group") {
      // console.log("group");
      mesh.scale.x *= aspectRw;
      mesh.scale.y *= aspectRh;
    }

    // console.log(aspectRw, aspectRh);

    this.uniforms.uResolution.value.x *= aspectRw;
    this.uniforms.uResolution.value.y *= aspectRh;

    // console.log(this.uniforms.uResolution.value);

    this.rect = nextRect;
    // setAspectRatio();
    // window.addEventListener("resize", setAspectRatio);
  }

  scroll(canvasRect) {
    const newCanvasRect = canvas.getBoundingClientRect();
    const {
      $: { el },
      mesh,
    } = this;
    const rect = el.getBoundingClientRect();

    if (newCanvasRect) {
      const { x, y } = getWorldPosition(rect, newCanvasRect);
      // mesh.position.x = x;
      mesh.position.y = y;
    }
    if (!newCanvasRect && canvasRect) {
      const { x, y } = getWorldPosition(rect, canvasRect);
      // mesh.position.x = x;
      mesh.position.y = y;
    }
  }

  render(tick) {
    this.uniforms.uTick.value = tick;
  }

  async afterInit() {
    // this.pauseVideo();
    // setTimeout(() => {
    //   this.playVideo();
    // }, 5000);
  }

  async playVideo() {
    let a = this.texes.get("tex1").source.data;
    console.log(a);
    if (a instanceof HTMLVideoElement) {
      await a.play();
    }
  }

  async pauseVideo() {
    // console.log(this.texes.get("tex1").source.data);
    let a = this.texes.get("tex1").source.data;
    console.log(a);
    if (a instanceof HTMLVideoElement) {
      await a.pause();
    }
  }
}

export { CustomObject };
