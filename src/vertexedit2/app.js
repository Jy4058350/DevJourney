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
import { iNode } from "../iNode";

init();
function init() {
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

   /* エラー時にシェーダの全体のコードを表示(three.js 0.152.0 対応) */
   renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
    
    const vertexShaderSource = gl.getShaderSource( vertexShader );
    const fragmentShaderSource = gl.getShaderSource( fragmentShader );
    
    console.groupCollapsed( "vertexShader" )
    console.log( vertexShaderSource )
    console.groupEnd()
    
    console.groupCollapsed( "fragmentShader" )
    console.log( fragmentShaderSource )
    console.groupEnd()

  }

  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  function setupGeometry() {
    const wSeg = 1;
    const hSeg = 1;
    const plane = new THREE.PlaneGeometry(50, 25, wSeg, hSeg);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", plane.getAttribute("position"));
    geometry.setAttribute("plane", plane.getAttribute("position"));
    geometry.setAttribute("uv", plane.getAttribute("uv"));

    console.log(geometry);

    return geometry;
  }
  const geometry = setupGeometry();
  window.geometry = geometry;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uProgress: { value: 0 },
      uTick: { value: 0 },
    },

    vertexShader,
    fragmentShader,
    // wireframe: true,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 30;

  const axis = new THREE.AxesHelper(100);
  scene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("zaxis")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("moving axis")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
