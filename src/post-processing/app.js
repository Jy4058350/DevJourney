/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// メインのレンダラーの設定
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

// レンダーターゲット
const renderTarget = new THREE.WebGLRenderTarget(500, 500)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rtCamera = camera.clone();
rtCamera.aspect = 1;
rtCamera.updateProjectionMatrix();
const rtScene = new THREE.Scene();
rtScene.background = new THREE.Color(0x444444);
rtCamera.position.set(0,0,10);
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);

// camera.position.set(5,5,5);
// ここまでレンダリングの設定


const rtGeo = new THREE.BoxGeometry(4, 4, 4);
const rtMate = new THREE.MeshLambertMaterial({ color: 0x009dff, side: THREE.DoubleSide });
const rtMesh = new THREE.Mesh(rtGeo, rtMate);
const geo = new THREE.BoxGeometry(4, 4, 4);
const mate = new THREE.MeshLambertMaterial({ color: 0x009dff, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(rtGeo, rtMate);
scene.add(mesh);

scene.background = new THREE.Color( 0xeeeeee );
const light1 = new THREE.PointLight( 0xffffff, 1, 0 );
light1.position.set( 0, 20, 0 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 1, 0 );
light2.position.set( 10, 20, 10 );
scene.add( light2 );

const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
light3.position.set( - 10, - 20, - 10 );
scene.add( light3 );

scene.add(rtMesh);


function animate() {
  requestAnimationFrame(animate);

  // メインのレンダラーの描写
  renderer.render(scene, camera);

  rtMesh.rotation.x += 0.01;
  rtMesh.rotation.y += 0.01;

  controls.update();
}

animate();
