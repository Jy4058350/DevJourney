import { PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from "three";

import { loader } from "../component/loader";
import { getWorldPosition, getResolution } from "../helper/utils";
import vertexShader from "./normal/vertex.glsl";
import fragmentShader from "./normal/fragment.glsl";

export class CustomObject {
  static async init({ el, type }) {
    const texes = await loader.texMap(el);
    console.log(type);
    const o = new CustomObject({ texes, el, type });
    return o;
  }
  constructor({ texes, el, type, canvasRect }) {
    this.$ = { el };
    this.texes = texes;
    this.rect = el.getBoundingClientRect();
    this.geometry = new PlaneGeometry(this.rect.width, this.rect.height, 1, 1);
    this.uniforms = {
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      // uResolution: { value: new Vector4()},
    };

    if (texes.get("tex1") === null) {
      texes.set("tex1", texes.get("tex2"));
    }

    const material = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      
      uniforms: this.uniforms,
    });

    this.uniforms = this.setupResolution(this.uniforms);

    this.texes.forEach((tex, key) => {
      material.uniforms[key] = { value: tex };
    });

    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.z = 0;
    // console.log(mesh);

    const { x, y } = getWorldPosition(this.rect, canvasRect);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
  }
  setupResolution(uniforms) {
    // const rect = el.getBoundingClientRect();
    if (!this.texes.has("tex1")) return uniforms;

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

    uniforms.uResolution = { value: resolution };
    return uniforms;
  }
}