/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";



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

  const geometry = new THREE.PlaneGeometry(50, 25);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output3.jpg") },
      uTex2: { value: await loadTex("/img/output2.jpg") },
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
  const folder1 = gui.addFolder("transparent");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.01)
    .name("tex1進行度").listen();
  folder1
    .add(material.uniforms.uProgress2, "value", 0, 1, 0.01)
    .name("color_gray").listen();
  folder1
    .add(material.uniforms.uProgress3, "value", 0, 1, 0.01)
    .name("transparentFromBottom")
    .listen();
  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("next_tex1")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });
  folder1
    .add(datData, "next")
    .name("tex2_from color to gray")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress2, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });
  folder1
    .add(datData, "next")
    .name("tex2_grayToTransparent")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress3, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;
    material.uniforms.uTick.value++;
    renderer.render(scene, camera);
  }

  animate();
}
