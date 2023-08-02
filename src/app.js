import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "/iNode";

init();
const item = iNode.qs(".item");
console.log(item);
const items = iNode.qsa(".item");
console.log(items);

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texloder = new THREE.TextureLoader();
    const texture = await texloder.loadAsync(url);
    return texture;
  }
  // const texture1 = await texloder.loadAsync("./img/1.jpeg");
  // const texture2 = await texloder.loadAsync("./img/2.jpeg");

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: texture2,
  });
  setTimeout(() => {
    material.map = texture1;
  }, 2000);

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 2;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axis = new THREE.AxesHelper(5);
  scene.add(axis);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;

    renderer.render(scene, camera);
  }

  animate();
}
