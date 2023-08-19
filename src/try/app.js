import "./try.scss";
import {
  WebGLRenderer,
  Scene,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  AxesHelper,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../inode.js";

const world = {};

init();

async function init() {
  const canvas = iNode.qs("#canvas");
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  const canvasRect = canvas.getBoundingClientRect();
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);
  // world.body.appendChild(renderer.domElement);
  world.scene = new Scene();
  world.camera = new PerspectiveCamera(
    75,
    canvasRect.width / canvasRect.height,
    0.1,
    1000
  );
  world.camera.position.z = 30;

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    return texture;
  }

  const geometry = new PlaneGeometry(50, 25);
  const material = new ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output3.jpg") },
      uTex2: { value: await loadTex("/img/output2.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const mesh = new Mesh(geometry, material);
  world.scene.add(mesh);

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
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

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    world.renderer.render(world.scene, world.camera);
  }

  animate();
}
