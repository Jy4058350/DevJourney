import * as THREE from "three";

init();

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const texloder = new THREE.TextureLoader();
  const texture1 = await texloder.loadAsync("./img/1.jpeg");
  const texture2 = await texloder.loadAsync("./img/2.jpeg");

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

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;

    renderer.render(scene, camera);
  }

  animate();
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const texloder = new THREE.TextureLoader();
const texture = await texloder.loadAsync("./img/1.jpeg");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
