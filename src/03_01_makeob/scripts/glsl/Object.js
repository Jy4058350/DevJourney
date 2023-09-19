import { loader } from "../component/loader";

export class CustomObject {
  static async init(el) {
    const texes = await loader.texMap(el);
    console.log(texes);
    const o = new CustomObject(texes, el);
    return o;
  }
  constructor() {
    if (texes.get("tex1") === null) {
      texes.set("tex1", texes.get("tex2"));
    }

    const rect = el.getBoundingClientRect();

    const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
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
      uniforms: {
        uMouse: { value: new Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        // uResolution: { value: new Vector4()},
      },
    });

    function setupResolution(uniforms) {
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

    material.uniforms = setupResolution(material.uniforms);

    texes.forEach((tex, key) => {
      material.uniforms[key] = { value: tex };
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.z = 0;
    // console.log(mesh);

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    const o = {
      mesh,
      geometry,
      material,
      rect,
      $: {
        el,
      },
    };
  }
}
