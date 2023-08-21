/**
 * Three.js
 * https://threejs.org/
 */
import "../style.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Mesh,
  AxesHelper,
  TextureLoader,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";

const world = {};
console.log(world);

init();
async function init() {
  world.scene = new Scene();
  const canvasRect = canvas.getBoundingClientRect();

  world.camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  world.renderer = new WebGLRenderer({ antialias: true });
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  world.renderer.setClearColor(0xffffff);
  // document.body.appendChild(renderer.domElement);

  const geometry = new PlaneGeometry(50, 25);
  const material = new ShaderMaterial({
    uniforms: {
      uTexCurrent: { value: await loadTex("/img/output4.jpg") },
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
  const plane = new Mesh(geometry, material);
  world.scene.add(plane);

  world.camera.position.z = 30;

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

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

  let i = 0;
  animate();
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    material.uniforms.uTick.value += 0.1;

    world.renderer.render(world.scene, world.camera);
  }

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    return texture;
  }

  const hovered = iNode.qsa(".hovered");
  const openSubmenu = iNode.qs(".open-submenu");
  const header = iNode.qs(".header");
  const dev = iNode.qs(".dev");
  const account = iNode.qs(".account");

  hovered.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("active");
      openSubmenu.classList.add("active");
      header.classList.add("white");
      dev.classList.add("white");
      account.classList.add("white");
      hovered.forEach((item) => {
        item.classList.add("white");
      });
    });
  });

  hovered.forEach((item) => {
    item.addEventListener("mouseleave", () => {
      if (!openSubmenu.matches(":hover")) {
        item.classList.remove("active");
        openSubmenu.classList.remove("active");
        // header.classList.remove("white");
        // dev.classList.remove("white");
        account.classList.remove("white");
        // hovered.forEach((item) => {
        //   item.classList.remove("white");
        // });
      }
    });
  });
  openSubmenu.addEventListener("mouseleave", () => {
    if (!openSubmenu.matches(":hover")) {
      openSubmenu.classList.remove("active");
      header.classList.remove("white");
      dev.classList.remove("white");
      account.classList.remove("white");
      hovered.forEach((item) => {
        item.classList.remove("white");
      });
    }
  });

  header.addEventListener("mouseenter", () => {
    dev.classList.add("white");
    header.classList.add("white");
    hovered.forEach((item) => {
      item.classList.add("white");
    });
  });
  header.addEventListener("mouseleave", () => {
    if (!openSubmenu.matches(".active")) {
      header.classList.remove("white");
      dev.classList.remove("white");
      hovered.forEach((item) => {
        item.classList.remove("white");
      });
    }
    if (!openSubmenu.matches(".active")) {
      header.classList.remove("white");
    }
  });
}
