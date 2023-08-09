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
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
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

  const geometry = new THREE.PlaneGeometry(25, 12.5);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output4.jpg") },
      uTex2: { value: await loadTex("/img/output5.jpg") },
      uTex3: { value: await loadTex("/img/output6.jpg") },
      uTex4: { value: await loadTex("/img/output7.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uProgress2: { value: 0 },
      uIndex: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.set(0, 0, 20);

  const axis = new THREE.AxesHelper(100);
  scene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("mix");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("mix")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("mix next")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  await Promise.all([
    material.uniforms.uTex1.value.image.onload,
    material.uniforms.uTex2.value.image.onload,
    material.uniforms.uTex3.value.image.onload,
  ]);

  startGsapAnimation();

  function startGsapAnimation() {
    let uIndex = 0;
    function update() {
      gsap.to(material.uniforms.uTick, {
        value: 10.0, //目標値
        duration: 0.1, //時間
        ease: "ease", //イージング
        onComplete: () => {
          if (uIndex === 0) {
            gsap.to(material.uniforms.uProgress, {
              value: 1.0, //目標値
              duration: 2.0, //時間
              ease: "ease", //イージング
              onComplete: () => {
                uIndex++;
                update();
                console.log("uIndex=1");
                console.log(uIndex);
              },
            });
          } else if (uIndex === 1) {
            gsap.to(material.uniforms.uProgress, {
              value: 1.0,
              duration: 4.0,
              ease: "ease",
              onComplete: () => {
                uIndex++;
                update();
                console.log("uIndex=2");
                console.log(uIndex);
              },
            });
          } else if (uIndex === 2) {
            gsap.to(material.uniforms.uProgress, {
              value: 1.0,
              duration: 4.0,
              ease: "ease",
              onComplete: () => {
                uIndex++;
                update();
                console.log("uIndex=3");
                console.log(uIndex);
              },
            });
          }
        },
      });

      console.log(uIndex);
    }
    update();
  }


  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    material.uniforms.uTick.value += 0.01;

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    // console.log(uIndex)
  }

  animate();
}
