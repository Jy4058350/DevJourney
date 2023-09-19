import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
  Mesh,
  Raycaster,
  Vector2,
  Vector4,
} from "three";

import { loader } from "../component/loader";
import { getWorldPosition } from "../helper/utils";

export class CustomObject {
  static async init(el) {
    const texes = await loader.texMap(el);
    // console.log(texes);
    const o = new CustomObject(texes, el);
    return o;
  }
  constructor(texes, el, canvasRect) {
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

    // const material = new MeshBasicMaterial({
    //   color: 0xff0000,
    //   transparent: true,
    //   opacity: 0.3,
    // });

    const material = new ShaderMaterial({
      vertexShader: `
                    varying vec2 vUv;
            
                    void main() {
                      vUv = uv;
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
                    }
                  `,
      fragmentShader: `
                    varying vec2 vUv;
                    uniform vec2 uMouse;
                    uniform float uHover;
                    uniform vec4 uResolution;
                    uniform sampler2D tex1;
                    uniform sampler2D tex2;
            
    
                    vec2 coverUv(vec2 uv, vec4 resolution) {
                      return (uv - .5) * resolution.zw + .5;
                    }
    
                    void main() {
    
                      vec2 uv = coverUv(vUv, uResolution);
    
    
                      vec4 t1 = texture2D(tex1, uv);
                      vec4 t2 = texture2D(tex2, vUv);
                      // vec2 mouse = step(uMouse, vUv);
                      // gl_FragColor = vec4(mouse, uHover, 1.);
                      // gl_FragColor = mix(t1, t2, uHover);
                      gl_FragColor = mix(t1, t2, step(0.5, vUv.x));
                      gl_FragColor = t1;
    
                    }
                  `,
    });

    function setupResolution(uniforms) {
      const rect = el.getBoundingClientRect();
      if (!texes.has("tex1")) return uniforms;

      const texData = texes.get("tex1").source.data;

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
      const resolution = new Vector4(rect.width, rect.height, 1, 1);
      if (!mrect) return resolution;
      const mAspect = mrect.height / mrect.width;
      const aspect = rect.height / rect.width;

      let xAspect, yAspect;
      if (aspect > mAspect) {
        xAspect = (1 / aspect) * mAspect;
        yAspect = 1;
      } else {
        xAspect = 1;
        yAspect = aspect / mAspect;
      }
      resolution.z = xAspect;
      resolution.w = yAspect;

      uniforms.uResolution = { value: resolution };
      return uniforms;
    }

    this.uniforms = setupResolution(this.uniforms);

    texes.forEach((tex, key) => {
      material.uniforms[key] = { value: tex };
    });

    this.mesh = new Mesh(this.geometry, material);
    this.mesh.position.z = 0;
    // console.log(mesh);

    const { x, y } = getWorldPosition(this.rect, canvasRect);
    this.mesh.position.x = x;
    this.mesh.position.y = y;

    // const o = {
    //   mesh: this.mesh,
    //   geometry: this.geometry,
    //   material: this.material,
    //   rect: this.rect,
    //   $: {
    //     el,
    //   }:this.$ = { el },
    // };
  }
}
