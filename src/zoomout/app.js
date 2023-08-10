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

  const geometry = new THREE.PlaneGeometry(50, 25);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output4.jpg") },
      uTex2: { value: await loadTex("/img/output5.jpg") },
      uTex3: { value: await loadTex("/img/output6.jpg") },
      uTex4: { value: await loadTex("/img/output7.jpg") },
      uTex5: { value: await loadTex("/img/output8.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uProgress2: { value: 0 },
      uProgress3: { value: 0 },
      uProgress4: { value: 0 },
      uProgress5: { value: 0 },
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
    .add(material.uniforms.uProgress4, "value", 0, 1, 0.1)
    .name("mix")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("mix next")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress4, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  await Promise.all([
    material.uniforms.uTex1.value.image.onload,
    material.uniforms.uTex2.value.image.onload,
    material.uniforms.uTex3.value.image.onload,
    material.uniforms.uTex4.value.image.onload,
    material.uniforms.uTex5.value.image.onload,
  ]);

  startGsapAnimation();

  function startGsapAnimation() {
    const tl = new gsap.timeline({
      onComplete: () => {
        console.log("Animation sequence complete");
        plane.position.z = 0;
        material.uniforms.uProgress.value = 0;
        material.uniforms.uProgress2.value = 0;
        material.uniforms.uProgress3.value = 0;
        material.uniforms.uProgress4.value = 0;
        material.uniforms.uProgress5.value = 0;

        startGsapAnimation();
      },
    });
    tl.to(material.uniforms.uProgress, {
      value: 1.0,
      duration: 10.0,
      ease: "ease",
      onComplete: () => {
        console.log("Animation sequence1 complete");
        console.log(material.uniforms.uProgress.value);
        material.uniforms.uIndex.value = 0;
        console.log(material.uniforms.uIndex.value);
        // Switch to the next texture
        tl.to(material.uniforms.uProgress2, {
          value: 1.0,
          duration: 10.0,
          onComplete: () => {
            console.log("Animation sequence2 complete");
            console.log(material.uniforms.uProgress2.value);
            console.log(material.uniforms.uIndex.value);
            material.uniforms.uIndex.value = 1;
            // Switch back to the first texture
            tl.to(material.uniforms.uProgress3, {
              value: 1.0,
              duration: 10.0,
              onComplete: () => {
                console.log("Animation sequence3 complete");
                console.log(material.uniforms.uProgress3.value);
                console.log(material.uniforms.uIndex.value);
                material.uniforms.uIndex.value = 2;
                tl.to(material.uniforms.uProgress4, {
                  value: 1.0,
                  duration: 10.0,
                  onComplete: () => {
                    console.log("Animation sequence4 complete");
                    console.log(material.uniforms.uProgress4.value);
                    console.log(material.uniforms.uIndex.value);
                    material.uniforms.uIndex.value = 3;
                    tl.to(material.uniforms.uProgress5, {
                      value: 1.0,
                      duration: 10.0,
                      onComplete: () => {
                        console.log("Animation sequence5 complete");
                        console.log(material.uniforms.uProgress5.value);
                        console.log(material.uniforms.uIndex.value);
                        material.uniforms.uIndex.value = 4;
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
    
    tl.play();
  }

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    material.uniforms.uTick.value += 0.01;
    plane.position.z -= 0.001;

    renderer.render(scene, camera);
  }

  animate();
}
