/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';


const world = {};
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
const os = [];
const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

init();
async function init() {
  world.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0xffffff);
  world.scene = new THREE.Scene();

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const near = 1500;
  const far = 4000;
  const aspect = cameraWidth / cameraHeight;
  const cameraZ = 2500;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);
  world.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();

    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 10,
      fog: true,
      linecap: "round", //ignored by WebGLRenderer
      linejoin: "round" //ignored by WebGLRenderer
    });
    const points = [];
    points.push(new THREE.Vector3(-40, 0, 0));
    points.push(new THREE.Vector3(0, 40, 0));
    points.push(new THREE.Vector3(40, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const mesh = new THREE.Line(geometry, material);
    console.log(mesh);

    // const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    const o = {
      rect,
      mesh,
      geometry,
      material,
      canvasRect,
      $: {
        el,
      },
    };
    os.push(o);

    world.scene.add(mesh);
    initResize();
  });

  initScroll();
  // const axis = new THREE.AxesHelper(100);
  // world.scene.add(axis);

  // const controls = new OrbitControls(world.camera, world.renderer.domElement);
  // controls.enableDamping = true;

  // const gui = new GUI();
  // const folder1 = gui.addFolder("z-distance");
  // folder1.open();

  // folder1
  //   .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
  //   .name("zaxis")
  //   .listen();

  // const datData = { next: !!material.uniforms.uProgress.value };
  // folder1
  //   .add(datData, "next")
  //   .name("moving axis")
  //   .onChange(() => {
  //     gsap.to(material.uniforms.uProgress, {
  //       value: datData.next ? 1 : 0,
  //       duration: 3,
  //       ease: "ease",
  //     });
  //   });
  rendere();
  function rendere() {
    requestAnimationFrame(rendere);
    os.forEach((o) => {
      scroll(o);
    });
    world.renderer.render(world.scene, world.camera);
    // controls.update();
  }
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

function resize(o, newCanvasRect) {
  const {
    mesh,
    rect,
    geometry,
    $: { el },
  } = o;
  const nextRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(nextRect, newCanvasRect);
  mesh.position.x = x;
  mesh.position.y = y;

  geometry.scale(nextRect.width / rect.width, nextRect.height / rect.height, 1);
  o.rect = nextRect;
}

function initResize() {
  let timer = null;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("resize");
      const newCanvasRect = canvas.getBoundingClientRect();
      world.renderer.setSize(canvasRect.width, canvasRect.height, false);
      os.forEach((o) => {
        resize(o, newCanvasRect);
      });

      const cameraWidth = newCanvasRect.width;
      const cameraHeight = newCanvasRect.height;
      const near = 1500;
      const far = 4000;
      const aspect = cameraWidth / cameraHeight;
      const cameraZ = 2500;
      const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
      const fov = radian * (180 / Math.PI);
      world.camera.near = near;
      world.camera.far = far;
      world.camera.aspect = aspect;
      world.camera.fov = fov;
      world.camera.updateProjectionMatrix();
    }, 500);
  });
}

function onPointerMove(event) {
  mouse.x = (event.clientX / canvasRect.width) * 2 - 1;
  mouse.y = -(event.clientY / canvasRect.height) * 2 + 1;
}

function raycast() {
  raycaster.setFromCamera(mouse, world.camera);
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    const uHover = _mesh.material.uniforms.uHover;
    if (intersect && intersect.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      uHover.__endValue = 1;
    } else {
      uHover.__endValue = 0;
    }
    uHover.value = lerp(uHover.value, uHover.__endValue, 0.001);
  }
}

function lerp(a, b, n) {
  let current = (1 - n) * a + n * b;
  if (Math.abs(b - current) < 0.001) current = b;
  return current;
}
window.addEventListener("pointermove", onPointerMove);

function scroll(o) {
  const {
    mesh,
    $: { el },
    canvasRect,
  } = o;
  const rect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, canvasRect);
  // mesh.position.x = x;
  mesh.position.y = y;
}

function initScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = iNode.qs("#page-container");

  const scrollBar = Scrollbar.init(pageContainer, { delegateTo: document });

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      if (arguments.length) {
        scrollBar.scrollTop = value; // setter
      }
      return scrollBar.scrollTop; // getter
    },
    // getBoundingClientRect() {
    //   return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    // }
  });

  scrollBar.addListener(ScrollTrigger.update);

  ScrollTrigger.defaults({
    scroller: pageContainer,
  });

  const el = iNode.qs("[data-webgl]");

  const meshX = os[0].mesh.position.x;
  const meshY = os[0].mesh.position.y;
  const animation = {
    rotation: 0,
    x: meshX,
    y: meshY,
  };
  gsap.to(animation, {
    rotation: Math.PI * 2,
    x: meshX,
    y: meshY,
    scrollTrigger: {
      trigger: el,
      start: "top 50%",
      // end: "top 30%",
      scrub: true,
      pin: true,
    },
    onUpdate() {
      os[0].mesh.position.x = animation.x;
      os[0].mesh.rotation.z = animation.rotation;
    },
  });
}

async function loadTex(url) {
  const texLoader = new THREE.TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  return texture;
}
