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
  BufferAttribute,
  BoxGeometry,
  Color,
  Raycaster,
  Vector2,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode.js";

const world = {};
const os = [];
const canvasRect = canvas.getBoundingClientRect();
const raycaster = new Raycaster();
const pointer = new Vector2();

init();

async function init() {
  const canvas = iNode.qs("#canvas");
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);
  // world.body.appendChild(renderer.domElement);

  // const positionZ = 1000;

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const aspect = cameraWidth / cameraHeight;
  const near = 1500;
  const far = 4000;
  const cameraZ = 2500;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(
    fov,
    cameraWidth / cameraHeight,
    near,
    far
  );
  world.camera.position.z = cameraZ;

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    const { x, y } = getWorldPosition(rect, canvasRect);

    function setupGeometry() {
      const widthSeg = 30;
      const heightSeg = 30;
      const random = [];
      const geometry = new PlaneGeometry(
        rect.width,
        rect.height,
        widthSeg,
        heightSeg
      );
      console.log(random);
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      //頂点の数　widthSeg+1 * heightSeg+1
      const maxCount = (widthSeg + 1) * (heightSeg + 1);
      for (let i = 0; i < maxCount; i++) {
        const randomInt = getRandomInt(1, maxCount);
        const randomDuration = (1 / maxCount) * randomInt;
        random.push(randomDuration);
        // console.log(randomInt, randomDuration);
      }
      geometry.setAttribute(
        "aRandom",
        new BufferAttribute(new Float32Array(random), 1)
      );
      return geometry;
    }

    const geometry = setupGeometry();
    window.geometry = geometry;
    const material = new ShaderMaterial({
      uniforms: {
        uMouse: { value: new Vector2(0.4, 0.4) },
        uTex1: { value: await loadTex("/img/output5.jpg") },
        uTex2: { value: await loadTex("/img/output4.jpg") },
        uTex3: { value: await loadTex("/img/texture1.png") },
        uHover: { value: 0 },
        uTick: { value: 0 },
        uProgress: { value: 0 },
        uEmissionColor: { value: new Color(0x00ff00) }, // エミッションの色
        uEmissionStrength: { value: 1.0 }, // エミッションの強度
      },
      vertexShader,
      fragmentShader,
      side: 2,
      // wireframe: true,
    });
    material.uniforms.uTex1.value.wrapS = MirroredRepeatWrapping; // 左右ミラーリング
    material.uniforms.uTex2.value.wrapS = MirroredRepeatWrapping; // 左右ミラーリング
    material.uniforms.uTex3.value.wrapS = MirroredRepeatWrapping; // 左右ミラーリング

    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, 0);

    const o = {
      geometry,
      material,
      mesh,
      rect,
      $: {
        el,
      },
    };
    os.push(o);
    world.scene.add(mesh);

    const gui = new GUI();
    const folder1 = gui.addFolder("slider");
    folder1.open();

    folder1
      .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("vertical")
      .listen();

    const datData = { next: !!material.uniforms.uProgress.value };
    folder1
      .add(datData, "next")
      .name("updown")
      .onChange(() => {
        gsap.to(material.uniforms.uProgress, {
          value: datData.next ? 0 : 1,
          duration: 5,
          ease: "ease",
        });
      });
  });

  render();
  function render() {
    requestAnimationFrame(render);
    os.forEach((o) => scroll(o));
    raycast();
    // controls.update();
    world.renderer.render(world.scene, world.camera);
  }
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

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

async function loadTex(url) {
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = MirroredRepeatWrapping;
  return texture;
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function raycast() {
  // const { mesh } = o;
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      _mesh.material.uniforms.uHover.value = 1;
    } else {
      // _mesh.material.uniforms.uHover.value = 0;
    }
  }
}
//線形補完
function lerp(start, end, amt) {
  //amtは0~1の間 amountの略
  let current = (1 - amt) * start + amt * end;
  if (Math.abs(end - current) < 0.0001) current = end;
  return current;
}

window.addEventListener("pointermove", onPointerMove);
