import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Mesh,
  TextureLoader,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  Raycaster,
  Vector4,
} from "three";

import vertexShader from "../vertex.glsl";
import fragmentShader from "../fragment.glsl";

import { iNode } from "../../../iNode";
import { viewport, utils } from "../helper";
import mousePick from "../component/mousePick";
import cash from "../component/cash";
import { texesIs } from "../component/texes";

const world = {
  os: [],
  init,
  fitWorldPositon,
  render,
  raycaster: new Raycaster(),
};

const texLoader = new TextureLoader();

const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();

function init(canvas, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(viewport.width, viewport.height, false);
  world.renderer.setClearColor(0x000000, 0);
  world.renderer.setPixelRatio(viewport.devicePixelRatio);

  world.scene = new Scene();

  world.camera = setupPerspectiveCamera(viewport);

  _initObjects(viewport);
}

async function _initObjects() {
  const els = iNode.qsa("[data-webgl]");
  const prms = [...els].map(async (el) => {
    const rect = el.getBoundingClientRect();

    const texes = await texesIs.init(el);

    const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
    const material = new ShaderMaterial({
      uniforms: {
        uMouse: { value: new Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uTick: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });
    function setupResolution(uniforms) {
      if (!texes.has("tex1")) return uniforms;
      const media = texes.get("tex1").source.data;

      const mediaRect = {
        width: media.naturalWidth,
        height: media.naturalHeight,
      };
      const resolution = getonResolution(rect, mediaRect);
      uniforms.uResolution = { value: resolution };

      const z = 0.1;
      const w = 1.0;
      material.uniforms.uVClamp = { value: new Vector4(z, 0, w, 1) };

      return uniforms;
    }

    function getonResolution(toRect, mediaRect) {
      const { width, height } = toRect;

      const resolution = new Vector4(width, height, 1, 1);
      if (!mediaRect) return resolution;
      const { width: mediaWidth, height: mediaHeight } = mediaRect;
      const mediaAspect = mediaHeight / mediaWidth;
      const toAspect = height / width;

      let xAspect, yAspect;
      if (mediaAspect < toAspect) {
        xAspect = (1 / toAspect) * mediaAspect;
        yAspect = 1;
      } else {
        xAspect = 1;
        yAspect = toAspect / mediaAspect;
      }

      resolution.z = xAspect;
      resolution.w = yAspect;
      // resolution.z = xAspect;
      // resolution.w = yAspect;

      return resolution;
    }
    material.uniforms = setupResolution(material.uniforms);

    texes.forEach((tex, key) => {
      material.uniforms[key] = { value: tex };
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.z = 0; //追加⭐️⭐️0830

    // const { x, y } = getWorldPosition(rect, canvasRect);
    // mesh.position.set(x, y, 0);

    const o = {
      $: { el },
      mesh,
      geometry,
      material,
      rect,
    };
    world.scene.add(mesh);
    world.os.push(o);
    // const gui = new GUI();
    // const folder1 = gui.addFolder("");
    // folder1.open();

    // folder1
    //   .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    //   .name("")
    //   .listen();

    // const datData = { next: !!material.uniforms.uProgress.value };
    // folder1
    //   .add(datData, "next")
    //   .name("")
    //   .onChange(() => {
    //     gsap.to(material.uniforms.uProgress, {
    //       value: datData.next ? 1 : 0,
    //       duration: 3,
    //       ease: "ease",
    //     });
    //   });

    // viewport._initResize();
  });

  await Promise.all(prms);
  fitWorldPositon(viewport);

  mousePick.init();
}

function setupPerspectiveCamera(viewport) {
  const { fov, near, far, cameraZ, aspect } = viewport;
  const camera = new PerspectiveCamera(fov, near, far, aspect);
  camera.position.z = cameraZ;
  return camera;
}

function fitWorldPositon(viewport) {
  world.renderer.setSize(viewport.width, viewport.height, false);

  world.os.forEach((o) => resize(o, viewport)); //newCanvasRectをviewportに変更

  updateCamera(viewport);
}

function resize(o, newCanvasRect) {
  const {
    mesh,
    rect,
    $: { el },
    geometry,
  } = o;
  const resizingRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(resizingRect, newCanvasRect);
  mesh.position.set(x, y, 0);

  geometry.scale(
    resizingRect.width / rect.width,
    resizingRect.height / rect.height,
    1
  );
  o.rect = resizingRect;
}
function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}
function updateCamera(viewport) {
  const { fov, near, far, aspect } = viewport;
  world.camera.near = near;
  world.camera.far = far;
  world.camera.aspect = aspect;
  world.camera.fov = fov;
  world.camera.updateProjectionMatrix();
  return world.camera;
}
function render() {
  requestAnimationFrame(render);
  world.os.forEach((o) => scroll(o)); //この記述を覚える！！
  // controls.update();

  raycast();

  world.renderer.render(world.scene, world.camera);
}

async function loadTex(url) {
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = MirroredRepeatWrapping;
  return texture;
}

function scroll(o) {
  const {
    $: { el },
    mesh,
  } = o;
  const rect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, viewport);
  mesh.position.y = y;
}

function raycast() {
  const pointerPos = mousePick.onPointerMove();
  world.raycaster.setFromCamera(pointerPos, world.camera);

  const intersects = world.raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      _mesh.material.uniforms.uHover.__endValue = 1;
    } else {
      _mesh.material.uniforms.uHover.__endValue = 0;
    }
    _mesh.material.uniforms.uHover.value = utils.lerp(
      _mesh.material.uniforms.uHover.value,
      _mesh.material.uniforms.uHover.__endValue,
      0.001
    );
  }
}

export default world;
