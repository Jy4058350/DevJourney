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
} from "three";

import { lerp, getWorldPosition } from "../helper/utils";

const world = {
  init,
  render,
};

const os = [];

const raycaster = new Raycaster();
const pointer = new Vector2();

function init(canvasRect, viewport) {
  //   initScroller();
  bindResizeEvents();
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

function initObjects(canvasRect) {
  const els = document.querySelectorAll("[data-webgl]");
  els.forEach((el) => {
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
      
              void main() {
                vec2 mouse = step(uMouse, vUv);
                gl_FragColor = vec4(mouse, uHover, 1.);
              }
            `,
      uniforms: {
        uMouse: { value: new Vector2(0.5, 0.5) },
        uHover: { value: 0 },
      },
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.z = 0;

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
  raycaster.setFromCamera(pointer, world.camera);

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

// function getWorldPosition(rect, canvasRect) {
//   const x = rect.left + rect.width / 2 - canvasRect.width / 2;
//   const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
//   return { x, y };
// }

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

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("pointermove", onPointerMove);


function bindResizeEvents() {
  let timerId = null;

  window.addEventListener("resize", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log("resize");

      const newCanvasRect = canvas.getBoundingClientRect();

      // canvasサイズの変更
      world.renderer.setSize(newCanvasRect.width, newCanvasRect.height, false);

      // meshの位置とサイズの変更
      os.forEach((o) => resize(o, newCanvasRect));

      // cameraのProjectionMatrixの変更
      const cameraWidth = newCanvasRect.width;
      const cameraHeight = newCanvasRect.height;
      const near = 1500;
      const far = 4000;
      const aspect = cameraWidth / cameraHeight;
      const cameraZ = 2000;
      const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
      const fov = radian * (180 / Math.PI);

      world.camera.fov = fov;
      world.camera.near = near;
      world.camera.far = far;
      world.camera.aspect = aspect;
      world.camera.updateProjectionMatrix();
    }, 500);
  });
}

export default world;
