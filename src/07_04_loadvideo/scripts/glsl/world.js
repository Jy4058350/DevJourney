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

import { lerp, getWorldPosition } from "../helper/utils";
import { viewport } from "../helper/viewport";
import { mouse } from "../component/mouse";
import { loader } from "../component/loader";

const os = [];

const world = {
  init,
  render,
  osResize,
};

const raycaster = new Raycaster();
const pointer = new Vector2();

function init(canvasRect, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();

  world.camera = new PerspectiveCamera(
    viewport.fov,
    viewport.aspect,
    viewport.near,
    viewport.far
  );
  world.camera.position.z = viewport.cameraZ;

  initObjects(canvasRect);
}

async function initObjects(canvasRect) {
  const els = document.querySelectorAll("[data-webgl]");
  // els.forEach(async (el) => {
  const prms = [...els].map(async (el) => {
    const texes = await loader.texMap(el);
    console.log(texes);

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

    world.scene.add(mesh);
    os.push(o);
  });
  await Promise.all(prms);
}

function render() {
  requestAnimationFrame(render);
  // スクロール処理
  os.forEach((o) => scroll(o));

  // レイキャスティング
  raycast();

  world.renderer.render(world.scene, world.camera);
}

function raycast() {
  // update the picking ray with the camera and pointer position
  const mp = mouse.pos();

  raycaster.setFromCamera(mp, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    const uHover = _mesh.material.uniforms.uHover;
    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      uHover.__endValue = 1;
    } else {
      uHover.__endValue = 0;
    }

    uHover.value = lerp(uHover.value, uHover.__endValue, 0.1);
  }
}

function scroll(o) {
  const newCanvasRect = canvas.getBoundingClientRect();
  const {
    $: { el },
    mesh,
  } = o;
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

function resize(o, newCanvasRect) {
  const {
    $: { el },
    mesh,
    geometry,
    rect,
  } = o;
  const nextRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(nextRect, newCanvasRect);
  mesh.position.x = x;
  mesh.position.y = y;

  // 大きさの変更
  geometry.scale(nextRect.width / rect.width, nextRect.height / rect.height, 1);

  o.rect = nextRect;
}

function osResize() {
  world.renderer.setSize(viewport.cameraWidth, viewport.cameraHeight, false);
  os.forEach((o) => resize(o, viewport.newCanvasRect));
  world.camera.fov = viewport.fov;
  world.camera.near = viewport.near;
  world.camera.far = viewport.far;
  world.camera.aspect = viewport.aspect;
  world.camera.updateProjectionMatrix();
}

export default world;
