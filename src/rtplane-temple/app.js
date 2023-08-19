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

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const near = 1500;
  const far = 8000;
  const aspect = cameraWidth / cameraHeight;
  const cameraZ = 2000;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  //レンダーターゲット
  const renderTarget = new WebGLRenderTarget(100, 100);

  world.camera = new PerspectiveCamera(fov, aspect, near, far);

  const rtCamera = world.camera.clone();
  rtCamera.aspect = 1;
  rtCamera.updateProjectionMatrix();
  const rtScene = new Scene();
  world.scene = new Scene();

  rtCamera.position.z = cameraZ;
  world.camera.position.z = cameraZ;

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const rtGeo = new PlaneGeometry(100, 100);
  const rtMate = new THREE.MeshBasicMaterial({
    color: 0x009dff,
    side: DoubleSide,
  });
  const rtMesh = new Mesh(rtGeo, rtMate);

  const geo = new PlaneGeometry(100, 100);
  const mate = new THREE.MeshBasicMaterial({
    color: 0x009dff,
    side: DoubleSide,
    map: renderTarget.texture,
  });
  const mesh = new Mesh(geo, mate);

  // meshのジオメトリのアスペクト比を取得
  const meshAspect =
    mesh.geometry.parameters.width / mesh.geometry.parameters.height;

  // rtMeshのジオメトリを調整してアスペクト比を合わせる
  rtMesh.geometry = new PlaneGeometry(
    rtMesh.geometry.parameters.width,
    rtMesh.geometry.parameters.width / meshAspect
  );

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

  console.log(
    "Mesh 1 Size:",
    mesh.geometry.parameters.width,
    mesh.geometry.parameters.height,
    mesh.geometry.parameters.depth
  );
  console.log(
    "Mesh 2 Size:",
    rtMesh.geometry.parameters.width,
    rtMesh.geometry.parameters.height,
    rtMesh.geometry.parameters.depth
  );

  // // カメラの視野角とビューポートのアスペクト比を取得
  // const fov = world.camera.fov * (Math.PI / 180); // ラジアンに変換
  // const aspect = world.camera.aspect;

  // // カメラからメッシュまでの距離を計算
  // const distance = world.camera.position.distanceTo(mesh.position);

  // // メッシュのスクリーン上での表示サイズを計算
  // const height = 2 * Math.tan(fov / 2) * distance;
  // const width = height * aspect;

  // console.log("Mesh Size on Screen:", width, height);

  // // カメラの視野角とビューポートのアスペクト比を取得
  // const fov1 = rtCamera.fov * (Math.PI / 180); // ラジアンに変換
  // const aspect1 =
  //   rtMesh.geometry.parameters.width / rtMesh.geometry.parameters.height;

  // // カメラからメッシュまでの距離を計算
  // const distance1 = rtCamera.position.distanceTo(rtMesh.position);

  // // メッシュのスクリーン上での表示サイズを計算
  // const height1 = 2 * Math.tan(fov1 / 2) * distance1;
  // const width1 = height1 * aspect1;

  // console.log("rtMesh Size on Screen:", width1, height1);

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    world.renderer.setRenderTarget(renderTarget);
    world.renderer.render(rtScene, rtCamera);
    world.renderer.setRenderTarget(null);

    // rtMesh.rotation.x += 0.01;
    // rtMesh.rotation.y += 0.01;
    // rtMesh.position.y += 0.01;

    world.renderer.render(world.scene, world.camera);
    controls.update();
  }

  animate();
}
