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
  BoxGeometry,
  MeshLambertMaterial,
  DoubleSide,
  Color,
  PointLight,
  WebGLRenderTarget,
  PointLightHelper,
} from "three";
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
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0xfffff, 0);

  //レンダーターゲット
  const renderTarget = new WebGLRenderTarget(500, 500);

  world.camera = new PerspectiveCamera(
    75,
    canvasRect.width / canvasRect.height,
    0.1,
    1000
  );
  const rtCamera = world.camera.clone();
  rtCamera.aspect = 1;
  rtCamera.updateProjectionMatrix();
  const rtScene = new Scene();
  world.scene = new Scene();

  rtCamera.position.set(0, 0, 5);
  world.camera.position.set(0, 0, 5);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const rtGeo = new PlaneGeometry(4, 4);
  const rtMate = new THREE.MeshBasicMaterial({
    color: 0x009dff,
    side: DoubleSide,
  });
  const rtMesh = new Mesh(rtGeo, rtMate);

  const geo = new PlaneGeometry(4, 4);
  const mate = new THREE.MeshBasicMaterial({
    // color: 0x009dff,
    side: DoubleSide,
    map: renderTarget.texture,
  });
  const mesh = new Mesh(geo, mate);
  world.scene.add(mesh);

  world.scene.background = new Color(0xffffff);

  const light = new PointLight(0xffffff, 10, 1000);
  light.position.set(100, 100, 100);
  const pHelper = new PointLightHelper(light);
  world.scene.add(light, pHelper);
  rtScene.add(light, pHelper);
  const light1 = new PointLight(0xffffff, 100, 1000);
  light.position.set(0, 0, 0);
  const pHelper1 = new PointLightHelper(light1);
  world.scene.add(light1, pHelper1);
  rtScene.add(light1, pHelper1);
  const light2 = new PointLight(0xffffff, 100, 1000);
  light.position.set(-100, -100, -100);
  rtScene.add(light2);

  rtScene.add(rtMesh);

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    world.renderer.setRenderTarget(renderTarget);
    world.renderer.render(rtScene, rtCamera);
    world.renderer.setRenderTarget(null);

    // rtMesh.rotation.x += 0.01;
    // rtMesh.rotation.y += 0.01;

    world.renderer.render(world.scene, world.camera);
    controls.update();
  }

  animate();
}
