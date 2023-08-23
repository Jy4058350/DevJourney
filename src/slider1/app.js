/**
 * Three.js
 * https://threejs.org/
 */
import "../style.scss";
import {
  WebGLRenderer,
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
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";
import headerAction from "../headerAction";

const world = {};
const os = [];

init();
async function init() {
  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0xffffff, 0);

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const near = 1500;
  const far = 4000;
  const aspect = cameraWidth / cameraHeight;
  const cameraZ = 2000;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

  document.body.appendChild(world.renderer.domElement);

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  // const controls = new OrbitControls(world.camera, world.renderer.domElement);
  // controls.enableDamping = true;

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
    const material = new ShaderMaterial({
      uniforms: {
        uTexCurrent: { value: await loadTex("/img/output5.jpg") },
        uTexNext: { value: await loadTex("/img/output5.jpg") },
        uTexDisp: { value: await loadTex("/img/displacement/4.png") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
        uProgress1: { value: 0 },
        uNoise: { value: new Vector2(10, 10) },
      },
      vertexShader,
      fragmentShader,
    });
    const mesh = new Mesh(geometry, material);
    world.scene.add(mesh);

    const o = {
      $: { el },
      mesh,
      rect,
      geometry,
      material,
    };
    os.push(o);
    scroll(o);
    initScroller();
    initResize();

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.set(x, y, 0);

    const gui = new GUI();
    const folder1 = gui.addFolder("slide");
    folder1.open();

    folder1
      .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("myslider")
      .listen();

    const datData = { next: !!material.uniforms.uProgress.value };
    folder1
      .add(datData, "next")
      .name("moving ")
      .onChange(() => {
        gsap.to(material.uniforms.uProgress, {
          value: datData.next ? 1 : 0,
          duration: 3,
          ease: "ease",
          onComplete: () => {
            console.log(datData.next);
          },
        });
      });
  });

  let i = 0;
  render();
  function render() {
    requestAnimationFrame(render);
    // controls.update();
    os.forEach((o) => scroll(o));

    world.renderer.render(world.scene, world.camera);
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

  function initScroller() {
    // initScrollerは不具合ありです
    gsap.registerPlugin(ScrollTrigger);
    // const { $: el } = os[0];
    const el = iNode.qs("[data-webgl]");

    const rect = el.getBoundingClientRect();
    const x = rect.left + 300;
    const pos = getWorldPosition({ left: x, width: rect.widht }, canvasRect);
  }

  function resize(o, newCanvasRect) {
    const {
      $: { el },
      mesh,
    } = o;
    const resizingRrect = el.getBoundingClientRect();
    const { x, y } = getWorldPosition(resizingRrect, newCanvasRect);
    mesh.position.set(x, y, 0);
  }

  function initResize() {
    let timer = null;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log("resize");
        const newCanvasRect = canvas.getBoundingClientRect();
        world.renderer.setSize(
          newCanvasRect.width,
          newCanvasRect.height,
          false
        );

        os.forEach((o) => resize(o, newCanvasRect));

        const cameraWidth = newCanvasRect.width;
        const cameraHeight = newCanvasRect.height;
        const near = 1500;
        const far = 4000;
        const aspect = cameraWidth / cameraHeight;
        const cameraZ = 2000;
        const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
        const fov = radian * (180 / Math.PI);
        world.camera.fov = fov;
        world.camera.near = near;
        world.camera.far = far;
        world.camera.aspect = aspect;
        world.camera.updateProjectionMatrix();
      }, 500);
    });
  }

  headerAction.init();
}
