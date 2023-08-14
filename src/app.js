/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    3000
  );

  camera.position.z = 1000;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  const control = new OrbitControls(camera, renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    return texture;
  }

  function setupGeometry() {
    const wSeg = window.innerWidth / 10; // Number of particles horizontally
    const hSeg = window.innerHeight / 10; // Number of particles vertically
    const plane = new THREE.PlaneGeometry(313, 75, wSeg, hSeg);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));

    return geometry;
  }

  const geometry = setupGeometry();
  // window.geometry = geometry;
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: await loadTex("/img/aaa.png") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uSaturation: { value: 0.7 },
      uLightness: { value: 0.67 },
      uColorDelay: { value: 0 },
      uColorTime: { value: 0.005 },
      uScaleDelay: { value: 4 },
      uScaleTime: { value: 0.04 },
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
  });
  // const material1 = new THREE.PointsMaterial({ color: 0xff0000 });
  const sphere = new THREE.Points(geometry, material);
  scene.add(sphere);

  // 軸ヘルパー
  // const axis = new THREE.AxesHelper(300);
  // scene.add(axis);

  // lil gui
  const gui = new GUI();
  gui
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("progress")
    .listen();
  const datObj = { next: !!material.uniforms.uProgress.value };
  gui
    .add(datObj, "next")
    .name("Animate")
    .onChange(function () {
      gsap.to(material.uniforms.uProgress, {
        value: +datObj.next,
        duration: 2,
        ease: "power2.out",
      });
    });

  let tick = 0;

  function animate() {
    requestAnimationFrame(animate);
    tick += 0.1;
    control.update();

    material.uniforms.uTick.value = tick;

    renderer.render(scene, camera);
  }

  animate();
}

function printMat(targetMatrix, col = 4, label = "") {
  const mat1D = targetMatrix?.elements ?? targetMatrix?.array ?? targetMatrix;
  console.log(mat1D);
  if (!mat1D instanceof Array) return;
  setTimeout(() => {
    // 非同期でマトリクスが更新されるため、非同期で実行
    let mat2D = mat1D.reduce((arry2D, v, i) => {
      if (i % col === 0) {
        arry2D.push([]);
      }
      const lastArry = arry2D[arry2D.length - 1];
      lastArry.push(v);
      return arry2D;
    }, []);
    console.log(
      `%c${label}`,
      "font-size: 1.3em; color: red; background-color: #e4e4e4;"
    );
    console.table(mat2D);
  });


const hovered = document.querySelector(".hovered");
console.log(hovered);

}
