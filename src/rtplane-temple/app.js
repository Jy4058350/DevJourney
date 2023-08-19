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
  DoubleSide,
  WebGLRenderTarget,
} from "three";
// import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";

const world = {};
init();

async function init() {
  //メインレンダラー
  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(
    75,
    canvasRect.width / canvasRect.height,
    0.1,
    1000
  );


  //ターゲットレンダー
  world.renderTarget = new WebGLRenderTarget();
  world.rtCamera = world.camera.clone();
  world.rtScene = new Scene();
  world.rtCamera.position.z = 100;

  const geo = new BoxGeometry(25, 25, 25);
  const mate = new ShaderMaterial({
    map: world.renderTarget.texture,
    vertexShader,
    fragmentShader,
  });
  const rtGeo = new BoxGeometry(25, 25, 25);
  const rtMate = new ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  const rtMesh = new Mesh(rtGeo, rtMate);
  const mesh = new Mesh(geo, mate);
  world.rtScene.add(rtMesh);
  world.scene.add(mesh);

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    world.renderer.setRenderTarget(world.renderTarget);
    world.renderer.render(world.rtScene, world.rtCamera);
    world.renderer.setRenderTarget(null);

    world.renderer.render(world.scene, world.camera);
  }

  animate();
}
