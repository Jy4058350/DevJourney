/**
 * Three.js
 * https://threejs.org/
 */
import "./test.scss";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  AxesHelper,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  Raycaster,
  Vector2,
  MeshBasicMaterial,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";

const world = {};
const os = [];
const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();

const raycaster = new Raycaster();
const pointer = new Vector2();

init();
function init() {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio); //追記
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const near = 1500;
  const far = 4000;
  const aspect = cameraWidth / cameraHeight;
  const cameraZ = 2000;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);
  world.camera = new PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

  // const axis = new AxesHelper(100);
  // world.scene.add(axis);

  // const controls = new OrbitControls(world.camera, world.renderer.domElement);
  // controls.enableDamping = true;

  const els = iNode.qsa("[data-webgl]");
  els.forEach((el) => {
    const rect = el.getBoundingClientRect();

    // function setupGeometry() {
    //   const widthSeg = 1;
    //   const heightSeg = 1;
    //   const geometry = new PlaneGeometry(
    //     rect.width,
    //     rect.height,
    //     widthSeg,
    //     heightSeg
    //   );

    //   return geometry;
    // }

    // const geometry = setupGeometry();
    const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
    const material = new ShaderMaterial({
      // const material = new MeshBasicMaterial({
      uniforms: {
        uMouse: { value: new Vector2(0.5, 0.5) },
        uHover: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      // wireframe: true,
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.z = 0; //追加

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.set(x, y, 0);

    const o = {
      $: { el },
      mesh,
      geometry,
      material,
      rect,
      canvasRect,
    };
    world.scene.add(mesh);
    os.push(o);

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
  });

  render();
  function render() {
    requestAnimationFrame(render);
    os.forEach((o) => scroll(o)); //この記述を覚える！！
    // controls.update();
    raycast();
    world.renderer.render(world.scene, world.camera);
  }
}

// async function loadTex(url) {
//   const texLoader = new TextureLoader();
//   const texture = await texLoader.loadAsync(url);
//   texture.wrapS = ClampToEdgeWrapping;
//   texture.wrapT = MirroredRepeatWrapping;
//   return texture;
// }

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

function scroll(o) {
  const {
    $: { el },
    mesh,
  } = o;
  const rect = el.getBoundingClientRect();
  const { y } = getWorldPosition(rect, canvasRect);
  mesh.position.y = y;
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function raycast() {
  // const { mesh } = o;
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      _mesh.material.uniforms.uHover.value = 1;
    } else {
      _mesh.material.uniforms.uHover.value = 0;
    }
  }
}

window.addEventListener("pointermove", onPointerMove);
