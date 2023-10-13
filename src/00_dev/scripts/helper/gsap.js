import gsap from "gsap";

const _box = new Map();
const _idx = new Map();
function startGsapAnimation(uniforms) {
  const uni = uniforms;
  for (let key in uni) {
    if (!key.startsWith("uProgress")) continue;
    if (key.startsWith("uProgress")) {
      _box.set(key, uni[key]);
    }
  }
  for (let key in uni) {
    if (!key.startsWith("uIndex")) continue;
    if (key.startsWith("uIndex")) {
      _idx.set(key, uni[key]);
    }
  }
}

let first = false;

// function gsapActive() {
//   const tl = new gsap.timeline({
//     onComplete: () => {
//       _box.forEach((uProgressOf, key) => {
//         uProgressOf.value = 0;
//       });

//       _idx.forEach((uIndexOf, key) => {
//         uIndexOf.value = 0;
//       });
//     },
//   });
//   const _boxArray = [..._box];
//   const _idxArray = [..._idx];

  
//   let i = 0;
//   console.log(_boxArray[i]);
//   tl.to(_boxArray[0], {
//     value: 1.0,
//     duration: 4.0,
//     ease: "ease",
//     onComplete: () => {
//       _idxArray[0] = 0;
//       tl.to(_boxArray[1], {
//         value: 1.0,
//         duration: 4.0,
//         onComplete: () => {
//           _idxArray[1] = 1;
//         },
//       });
//     },
//   });
//   tl.to(_boxArray[1], {
//     value: 1.0,
//     duration: 4.0,
//     ease: "ease",
//     onComplete: () => {
//       _idxArray[1] = 0;
//       tl.to(_boxArray[2], {
//         value: 1.0,
//         duration: 4.0,
//         onComplete: () => {
//           _idxArray[2] = 1;
//         },
//       });
//     },
//   });
// }

export { startGsapAnimation, gsapActive };
