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

const world = {};

init();
async function init() {
  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
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
  // document.body.appendChild(world.renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  // function Setgeo(w, h) {
  //   const geometry = new THREE.BufferGeometry();
  //   const plane = new THREE.PlaneGeometry(w, h, 1, 1);
  //   console.log(w, h);
  //   geometry.setAttribute("position", plane.getAttribute("position"));
  //   geometry.setAttribute("uv", plane.getAttribute("uv"));
  //   const planeIndex = plane.getIndex().array;
  //   const index = new THREE.BufferAttribute(planeIndex, 1);
  //   geometry.setIndex(index);
  //   return geometry;
  // }

  class Setgeo {
    constructor(w, h) {
      this.geometry = new THREE.BufferGeometry();
      // console.log(w, h);
      this.plane = new THREE.PlaneGeometry(w, h, 1, 1);
    }
    createBufferGeo(w, h) {
      this.geometry.setAttribute(
        "position",
        this.plane.getAttribute("position")
        );
        this.geometry.setAttribute("uv", this.plane.getAttribute("uv"));
        const planeIndex = this.plane.getIndex().array;
        const index = new THREE.BufferAttribute(planeIndex, 1);
        this.geometry.setIndex(index);
      return this.geometry;
    }
  }

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();

    const set = new Setgeo(rect.width, rect.height);
    const geometry = set.createBufferGeo(rect.width, rect.height);
    // const geometry = Setgeo(rect.width, rect.height);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTex1: { value: await loadTex("/img/output3.jpg") },
        uTex2: { value: await loadTex("/img/output2.jpg") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      // wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    world.scene.add(mesh);
  });

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

  animate();
  function animate() {
    requestAnimationFrame(animate);
    world.renderer.render(world.scene, world.camera);
    // controls.update();
  }
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}
