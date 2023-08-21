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
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";

const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();
const world = {};
const os = [];
init();

async function init() {
  //メインレンダー
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0x00000, 0);
  world.scene = new Scene();

  const cameraZ = 2000;
  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const aspect = cameraWidth / cameraHeight;
  const near = 1500;
  const far = 4000;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.camera = new PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

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
  const commonGeoSize = new Vector2(100, 100);

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    const geo = new PlaneGeometry(commonGeoSize.x, commonGeoSize.y);
    const mate = new MeshBasicMaterial({
      color: 0xffffff,
      // transparent: true,
      map: world.renderTarget.texture,
    });
    const mesh = new Mesh(geo, mate);
    world.scene.add(mesh);
    const o = {
      $: { el },
      mesh,
      geo,
      mate,
      rect,
    };
    os.push(o);

    const rtGeo = new PlaneGeometry(commonGeoSize.x, commonGeoSize.y);
    const rtMate = new ShaderMaterial({
      uniforms: {
        uTex1: { value: await loadTex("/img/output3.jpg") },
        uTex2: { value: await loadTex("/img/output2.jpg") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });

    const rtmesh = new Mesh(rtGeo, rtMate);
    world.rtScene.add(rtmesh);

    const axis = new AxesHelper(100);
    world.scene.add(axis);

    const gui = new GUI();
    const folder1 = gui.addFolder("");
    folder1.open();

    folder1
      .add(rtMate.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("")
      .listen();

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

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.set(x, y, 0);
  });

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    world.renderer.setRenderTarget(world.renderTarget);
    world.renderer.render(world.rtScene, world.rtCamera);
    world.renderer.setRenderTarget(null);

    world.renderer.render(world.scene, world.camera);

    os.forEach((o) => scroll(o));
    controls.update();
  }

  animate();
}

async function loadTex(url) {
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = MirroredRepeatWrapping;
  return texture;
}

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
