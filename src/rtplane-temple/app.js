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
  world.renderer.setClearColor(0x000000, 0);


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
  const rtScene = new Scene();
  world.scene = new Scene();

  world.camera.position.set(-10, -10, 10);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const rtGeo = new BoxGeometry(4, 4, 4);
  const rtMate = new MeshLambertMaterial({
    color: 0x009dff,
    side: DoubleSide,
  });
  const rtMesh = new Mesh(rtGeo, rtMate);

  const geo = new BoxGeometry(4, 4, 4);
  const mate = new THREE.MeshBasicMaterial({
    color: 0x009dff,
    side: DoubleSide,
    map: renderTarget.texture,
  });
  const mesh = new Mesh(geo, mate);
  world.scene.add(mesh);


 
  world.scene.background = new Color(0xeeeeee);
  const light = new PointLight(0xffffff, 1, 0);
  light.position.set(10, 20, 10);
  rtScene.add(light);
  const light1 = new PointLight(0xffffff, 1, 0);
  light.position.set(10, 10, 10);
  rtScene.add(light1);
  const light2 = new PointLight(0xffffff, 1, 0);
  light.position.set(-10, -20, -10);
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

    rtMesh.rotation.x += 0.01;
    rtMesh.rotation.y += 0.01;

    world.renderer.render(world.scene, world.camera);
    controls.update();
  }

  animate();
}
