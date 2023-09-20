import { PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from "three";

import { loader } from "../component/loader";
import { getWorldPosition, getResolution } from "../helper/utils";

class CustomObject {
  static async init({ el, type }) {
    const texes = await loader.texMap(el);
    const i = new this({ texes, el, type });
    return i;
  }
  constructor({ texes, el, type, canvasRect }) {
    this.$ = { el };
    this.texes = texes ?? [];
    this.rect = el.getBoundingClientRect();
    if (texes.get("tex1") === null) {
      texes.set("tex1", texes.get("tex2"));
    }

    this.after = this.afterInit();
    this.before = this.before();
    this.defines = this.fixDefines();
    this.uniforms = this.fixUniforms();
    this.uniforms = this.fixTexes(this.uniforms);
    this.uniforms = this.setupResolution(this.uniforms);
    this.vertexShader = this.fixVertex();
    this.fragmentShader = this.fixFragment();
    this.geometry = this.fixGeometry();
    this.material = this.fixMaterial();
    this.mesh = this.fixMesh();
    this.disv();
    this.style();

    const { x, y } = getWorldPosition(this.rect, canvasRect);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
  }

  before() {}
  after() {}

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
    };
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

    const texData = this.texes.get("tex1").source.data;

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
    const resolution = getResolution(this.rect, mrect);

    u.uResolution = { value: resolution };
    return u;
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

  resize(newCanvasRect) {
    const {
      $: { el },
      mesh,
      geometry,
      rect,
    } = this;
    const nextRect = el.getBoundingClientRect();
    const { x, y } = getWorldPosition(nextRect, newCanvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    // 大きさの変更
    geometry.scale(
      nextRect.width / rect.width,
      nextRect.height / rect.height,
      1
    );

    this.rect = nextRect;
  }

  render(tick) {
    this.uniforms.uTick.value = tick;
  }
  async afterInit() {
    // debugger;
    this.pauseVideo();
  }

  async playVideo() {
    await this.texes.get("tex1").source.play();
  }

  async pauseVideo() {
    console.log(this.texes.get("tex1").source.data.autoplay);
    let a = this.texes.get("tex1").source.data.autoplay;
    a = false;
    console.log(a);

    // await this.texes.get("tex1").source.pause();
  }
}

export { CustomObject };
