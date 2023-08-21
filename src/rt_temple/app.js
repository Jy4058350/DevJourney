/**
 * Three.js
 * https://threejs.org/
 */
import "./test.scss";
import {
  WebGLRenderer,
  WebGLRenderTarget,
  Scene,
  PerspectiveCamera,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  AxesHelper,
  Vector2,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  MeshBasicMaterial,
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
  //メインレンダー
  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0x00000, 0);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(
    75,
    canvasRect.width / canvasRect.height,
    0.1,
    1000
  );
  world.camera.position.z = 30;

  //レンダーターゲット
  const renderTargetCanvas = iNode.qs("canvas");

  world.renderTarget = new WebGLRenderTarget(
    renderTargetCanvas.width,
    renderTargetCanvas.height,
    {
      canvas: renderTargetCanvas,
      antialias: true,
    }
  );
  world.rtCamera = world.camera.clone();
  world.rtScene = new Scene();

  const commonGeoSize = new Vector2(64, 80);

  const rtGeo = new PlaneGeometry(commonGeoSize.x, commonGeoSize.y);
  const rtMate = new ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output1.jpg") },
      uTex2: { value: await loadTex("/img/output2.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const geo = new PlaneGeometry(commonGeoSize.x, commonGeoSize.y);
  const mate = new MeshBasicMaterial({
    color: 0xffffff,
    // transparent: true,
    map: world.renderTarget.texture,
  });

  const mesh = new Mesh(geo, mate);
  const rtmesh = new Mesh(rtGeo, rtMate);
  world.scene.add(mesh);
  world.rtScene.add(rtmesh);

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    return texture;
  }

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("");
  folder1.open();

  folder1.add(rtMate.uniforms.uProgress, "value", 0, 1, 0.1).name("").listen();

  const datData = { next: !!rtMate.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    world.renderer.setRenderTarget(world.renderTarget);
    world.renderer.render(world.rtScene, world.rtCamera);
    world.renderer.setRenderTarget(null);

    world.renderer.render(world.scene, world.camera);
    controls.update();
  }

  animate();
}
