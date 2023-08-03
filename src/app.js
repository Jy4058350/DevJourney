import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "/iNode";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import createTextGeometry from "createTextGeometry";


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

  const text = "Hello World!";

  const textGeometry = createTextGeometry({
    text: text,
    font: await new THREE.FontLoader().loadAsync("path/to/your/font.json"),
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // async function loadText(url) {
  //   const texloder = new THREE.TextureLoader();
  //   const texture = await texloder.loadAsync(url);
  //   texture.format = THREE.RGBAFormat;
  //   texture.alpha = true;
  //   return texture;
  // }

  // const textGeometry = new THREE.TextGeometry(text, {
  //   // font: await new THREE.FontLoader().load("./TestCalibre-BlackItalic.otf"),
  //   size: 0.5,
  //   height: 0.2,
  //   curveSegments: 12,
  //   bevelEnabled: true,
  //   bevelThickness: 0.03,
  //   bevelSize: 0.02,
  //   bevelOffset: 0,
  //   bevelSegments: 5,
  // });

  const textMaterial = new THREE.MeshBasicMaterial({
    // uniforms: {
    //   uTex: { value: await loadText("./TestCalibre-BlackItalic.otf") },
    //   uTick: { value: 0 },
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    // },

    // uniforms: {
    //   uTex: { value: await loadTex("./img/loading.png") },
    //   uTick: { value: 0 },
    // },
    vertexShader,
    fragmentShader,
  });
  // setTimeout(() => {
  //   material.map = texture1;
  // }, 2000);

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);
  // console.log(geometry);

  camera.position.z = 2;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axis = new THREE.AxesHelper(5);
  scene.add(axis);

  let updateCount = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (updateCount < 20) {
      // Perform the update only twice
      material.uniforms.uTick.value += 40;
      updateCount++;
    }
    controls.update();

    // cube.rotation.x += 0.2;
    // cube.rotation.y += 0.2;

    renderer.render(scene, camera);
  }

  animate();
}
