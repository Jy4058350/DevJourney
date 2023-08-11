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
      uTex1: { value: await loadTex("/img/output4.jpg") },
      uTex2: { value: await loadTex("/img/output5.jpg") },
      uTex3: { value: await loadTex("/img/output6.jpg") },
      uTex4: { value: await loadTex("/img/output7.jpg") },
      uTex5: { value: await loadTex("/img/output8.jpg") },
      uTick: { value: 0 },
      uIndex: { value: 2 },
      uProgress: { value: 0 },
      uProgress1: { value: 0 },
      uProgress2: { value: 0 },
      uProgress3: { value: 0 },
      color1: { value: 0 },
      color2: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 30;

  const axis = new THREE.AxesHelper(100);
  scene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("gray");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress1, "value", 0, 1, 0.1)
    .name("gray")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("graydown")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress1, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  const addAnimation = () => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(material.uniforms.uIndex, {
      value: 1,
      duration: 0.5,
      ease: "ease",
      onComplete: () => {
        const initialZ = plane.position.z;
        animateZDecrease(initialZ);
      },
    })
      .to(material.uniforms.color1, {
        value: 1,
        duration: 3,
        ease: "ease",
        onComplete: () => {
          const initialZ = plane.position.z;
          animateZDecrease(initialZ);
        },
      })
      .to(material.uniforms.uProgress1, {
        value: 1,
        duration: 3,
        ease: "ease",
        onComplete: () => {
          revertZposition(300, 0.01);
        },
      })
      .to(material.uniforms.uIndex, {
        value: 2,
        duration: 0.00001,
        ease: "ease",
      })
      .to(material.uniforms.uProgress2, {
        value: 1,
        duration: 5,
        ease: "ease",
      })
      .to(material.uniforms.uIndex, {
        value: 3,
        duration: 0.00001,
        ease: "ease",
      })
      .to(material.uniforms.uProgress3, {
        value: 1,
        duration: 5,
        ease: "ease",
      });
  };

  // zポジション減少関数
  function animateZDecrease(initialZ) {
    const zAnimationDuration = 2.5;
    const animateZDecrease = 0.01;
    const zAnimationSteps = Math.floor(zAnimationDuration / animateZDecrease);
    let zValues = [];

    for (let i = 0; i < zAnimationSteps; i++) {
      const zTarget = initialZ - i * animateZDecrease;
      zValues.push(zTarget);

      gsap.to(plane.position, {
        z: zTarget,
        duration: zAnimationDuration / zAnimationSteps,
        delay: i * (zAnimationDuration / zAnimationSteps),
        ease: "linear",
        onComplete: () => {
          if (i === zAnimationSteps - 1) {
            console.log(" Z position animation complete");
          }
        },
      });
    }
  }

  //zポジションを元に戻す関数
  function revertZposition(steps, decreaseAmount) {
    for (let i = steps - 1; i >= 0; i--) {
      const zRevertTarget = plane.position.z + (steps - 1 - i) * decreaseAmount;
      gsap.to(plane.position, {
        z: zRevertTarget,
        duration: 3 / steps,
        delay: (steps - 1 - i) * (3 / steps),
        ease: "linear",
      });
    }
  }

  addAnimation();

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}
