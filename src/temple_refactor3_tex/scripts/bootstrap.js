import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  AxesHelper,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  Raycaster,
  Vector2,
} from "three";
// import vertexShader from "../vertex.glsl";
// import fragmentShader from "../fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../../iNode";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import scroll from "./component/scroller";

// const os = [];
const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();

// const raycaster = new Raycaster();
// const pointer = new Vector2();

export function init() {
  const canvas = iNode.qs("#canvas");

  viewport.init(canvas); //カメラのnear,far,fovを変更したい場合には第二引数から設定する
  scroll.initScroll();

  world.init(canvas, viewport);

  world.render();


  // const axis = new AxesHelper(100);
  // world.scene.add(axis);

  // const controls = new OrbitControls(world.camera, world.renderer.domElement);
  // controls.enableDamping = true;

  // const els = iNode.qsa("[data-webgl]");
  // els.forEach(async (el) => {
  //   const rect = el.getBoundingClientRect();
  //   const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
  //   const material = new ShaderMaterial({
  //     uniforms: {
  //       uMouse: { value: new Vector2(0.5, 0.5) },
  //       uHover: { value: 0 },
  //       uTex1: { value: await loadTex("/img/output1.jpg") },
  //       uTex2: { value: await loadTex("/img/output2.jpg") },
  //       uTick: { value: 0 },
  //       uProgress: { value: 0 },
  //     },
  //     vertexShader,
  //     fragmentShader,
  //   });

  // const mesh = new Mesh(geometry, material);
  // world.scene.add(mesh);

  // const { x, y } = getWorldPosition(rect, canvasRect);
  // mesh.position.set(x, y, 0);

  // const o = {
  //   $: { el },
  //   mesh,
  //   geometry,
  //   material,
  //   rect,
  //   canvasRect,
  // };
  // os.push(o);

  // const gui = new GUI();
  // const folder1 = gui.addFolder("");
  // folder1.open();

  // folder1
  //   .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
  //   .name("")
  //   .listen();

  // const datData = { next: !!material.uniforms.uProgress.value };
  // folder1
  //   .add(datData, "next")
  //   .name("")
  //   .onChange(() => {
  //     gsap.to(material.uniforms.uProgress, {
  //       value: datData.next ? 1 : 0,
  //       duration: 3,
  //       ease: "ease",
  //     });
  //   });
  // });

  // viewport._initResize();

  // render();
  // function render(world) {
  //   requestAnimationFrame(render);
  //   os.forEach((o) => scroll(o)); //この記述を覚える！！
  //   // controls.update();
  //   // raycast();
  //   world.renderer.render(world.scene, world.camera);
  // }
}

// async function loadTex(url) {
//   const texLoader = new TextureLoader();
//   const texture = await texLoader.loadAsync(url);
//   texture.wrapS = ClampToEdgeWrapping;
//   texture.wrapT = MirroredRepeatWrapping;
//   return texture;
// }

// function getWorldPosition(rect, canvasRect) {
//   const x = rect.left + rect.width / 2 - canvasRect.width / 2;
//   const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
//   return { x, y };
// }

// function scroll(o) {
//   const {
//     $: { el },
//     mesh,
//   } = o;
//   const rect = el.getBoundingClientRect();
//   const { y } = getWorldPosition(rect, canvasRect);
//   mesh.position.y = y;
// }

// function initScroll() {
//   gsap.registerPlugin(ScrollTrigger);
//   const pageConatainer = iNode.qs("#page-container");
//   console.log(pageConatainer);

//   const scrollBar = Scrollbar.init(pageConatainer, { delegate:document})

//   ScrollTrigger.scrollerProxy(pageConatainer, { //スクロール要素として設定しスクロール位置を監視するためのプロキシを作成
//     scrollTop(value) {
//       if(arguments.length){
//         scrollBar.scrollTop = value; //setter
//       }
//       return scrollBar.scrollTop; //getter

//   }});
//   scrollBar.addListener(ScrollTrigger.update);//スクロールイベントに対してアップデート関数をリスナーとして登録

//   ScrollTrigger.defaults({ scroller: pageConatainer });//デフォルトのスクロール要素を設定

//   const el = iNode.qs("[data-webgl]");

// const rect = el.getBoundingClientRect();
// const x = rect.left + 300;
// const pos = getWorldPosition({ left: x, width: rect.width }, canvasRect);

// gsap.to(os[0].mesh.position, {
//   x: pos.x,
//   scrollTrigger: {
//     trigger: el,
//     start: "center 70%",
//     end: "center center",
//     scrub: true,
//     pin: true,
//   },
// });
// }

// function resize(o, newCanvasRect) {
//   //位置の変更
//   const {
//     mesh,
//     rect,
//     $: { el },
//     geometry,
//   } = o;
//   const resizingRect = el.getBoundingClientRect();
//   const { x, y } = getWorldPosition(rect, newCanvasRect);
//   mesh.position.set(x, y, 0);

//   //大きさの変更
//   geometry.scale(
//     resizingRect.width / rect.width,
//     resizingRect.height / rect.height,
//     1
//   );
//   o.rect = resizingRect;
// }

// function onPointerMove(event) {
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// function raycast() {
//   // update the picking ray with the camera and pointer position
//   raycaster.setFromCamera(pointer, world.camera);

//   // calculate objects intersecting the picking ray
//   const intersects = raycaster.intersectObjects(world.scene.children);
//   const intersect = intersects[0];

//   for (let i = 0; i < world.scene.children.length; i++) {
//     const _mesh = world.scene.children[i];

//     if (intersect?.object === _mesh) {
//       _mesh.material.uniforms.uMouse.value = intersect.uv;
//       _mesh.material.uniforms.uHover.__endValue = 1;
//     } else {
//       _mesh.material.uniforms.uHover.__endValue = 0;
//     }
//     _mesh.material.uniforms.uHover.value = lerp(
//       _mesh.material.uniforms.uHover.value,
//       _mesh.material.uniforms.uHover.__endValue,
//       0.001
//     );
//   }
//   function lerp(start, end, amt) {
//     let current = (1 - amt) * start + amt * end;
//     if (Math.abs(end - current) < 0.0001) current = end;
//     return current;
//   }
// }

// window.addEventListener("pointermove", onPointerMove);
