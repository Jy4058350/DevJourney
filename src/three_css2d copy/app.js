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
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

let gui;

let material;

let scene, camera, renderer, labelRenderer;


init();

animate();

async function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  scene = new THREE.Scene();
  camera.position.z = 30;

  const dirLight = new THREE.DirectionalLight(0xf0000f, 1);
  dirLight.position.set(0, 0, 1);
  scene.add(dirLight);

  const axis = new THREE.AxesHelper(30);
  scene.add(axis);

  const geometry = new THREE.PlaneGeometry(50, 25);
  material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output3.jpg") },
      // uTex2: { value: await loadTex("/img/output2.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  const EARTH_RADIUS = 5;
  const geo = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
  const mate = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
  });

  const mesh = new THREE.Mesh(geo, mate);
  scene.add(mesh);

  const earthDiv = document.createElement("div");
  earthDiv.className = "label";
  earthDiv.textContent = "Earth";
  earthDiv.style.backgroundColor = "transparent";
  earthDiv.style.color = "white";
  earthDiv.style.fontSize = "20px";
  earthDiv.style.fontWeight = "bold";
  console.log(earthDiv.style);

  const earthLabel = new CSS2DObject(earthDiv);
  earthLabel.center = new THREE.Vector2(0.5, 0.5);
  earthLabel.position.set(1.0 * EARTH_RADIUS, -4, 0); //位置　x,y,z
  earthLabel.center.set(0, 1);
  mesh.add(earthLabel);
  earthLabel.layers.set(0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight, false);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 100;

  initGui();
}


function animate() {
  requestAnimationFrame(animate);
  // controls.update();

  if (renderer && labelRenderer) {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
}

async function loadTex(url) {
  const texLoader = new THREE.TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  return texture;
}


function initGui() {
  gui = new GUI();
    const folder1 = gui.addFolder("z-distance");
    folder1.open();
  
    folder1
      .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("zaxis")
      .listen();
  
    const datData = { next: !!material.uniforms.uProgress.value };
    folder1
      .add(datData, "next")
      .name("moving axis")
      .onChange(() => {
        gsap.to(material.uniforms.uProgress, {
          value: datData.next ? 1 : 0,
          duration: 3,
          ease: "ease",
        });
      });

}
