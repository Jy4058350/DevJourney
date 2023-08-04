/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";

init();
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
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  const geometry = new THREE.PlaneGeometry(40, 25);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexCurrent: { value: await loadTex("/img/output3.jpg") },
      uTexNext: { value: await loadTex("/img/output1.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uProgress2: { value: 0 },
      uProgress3: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 30;

  const gui = new GUI();
  const folder1 = gui.addFolder("slider0");
  folder1.open();

  folder1.add(material.uniforms.uProgress, "value", 0, 1, 0.01);
  folder1.add(material.uniforms.uProgress2, "value", 0, 1, 0.01);
  folder1.add(material.uniforms.uProgress3, "value", 0, 1, 0.01);

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uProgress.value = material.uniforms.uProgress3.value;
    material.uniforms.uProgress2.value = material.uniforms.uProgress3.value;

    // material.uniforms.uTick.value++;
    renderer.render(scene, camera);
  }

  animate();
}
