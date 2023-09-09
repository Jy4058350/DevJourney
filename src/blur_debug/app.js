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
  console.log(canvasRect);

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const aspect = cameraWidth / cameraHeight;
  const near = 1500;
  const far = 4500;
  const cameraZ = 2500;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new THREE.Scene();
  world.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  world.renderer = new THREE.WebGLRenderer({ antialias: true });
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  world.renderer.setClearColor(0xffffff);
  document.body.appendChild(world.renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  function setUpGEO() {
    const geometry = new THREE.BufferGeometry();
    const plane = new THREE.PlaneGeometry(cameraWidth, cameraHeight, 1, 1);
    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));
    const planeIndex = plane.getIndex().array;
    const index = new THREE.BufferAttribute(planeIndex, 1);
    geometry.setIndex(index);
    return geometry;
  }
  const geometry = setUpGEO();
  // const geometry = new THREE.PlaneGeometry(cameraWidth, cameraHeight, 1, 1);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output3.jpg") },
      uTex2: { value: await loadTex("/img/output2.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const plane = new THREE.Mesh(geometry, material);
  world.scene.add(plane);

  world.camera.position.z = cameraZ;

  const axis = new THREE.AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

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

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    world.renderer.render(world.scene, world.camera);
  }

  animate();
}
