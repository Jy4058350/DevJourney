import gsap from "gsap";

const _box = new Map();
const _idx = new Map();

const _boxArray = [..._box];
const _idxArray = [..._idx];

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

function gsapActive() {
  
}

// function gsapActive() {
//   const _boxArray = [..._box];
//   const _idxArray = [..._idx];
//     console.log(_boxArray[0]);
//   const tl = new gsap.timeline();
//   _idxArray[0].value = 0.0;
//   _boxArray[0].value = 0.0;
//   _boxArray[1].value = 0.0;
//   tl.to(_idxArray[0], {
//     value: 0.0,
//     duration: 5.0,
//     ease: "ease",
//     onComplete: () => {
//       console.log(_idxArray[0].value);
//       _idxArray[0].value = 1.0;
//     },
//   });
//   tl.to(_boxArray[0], {
//     value: 1.0,
//     duration: 3.0,
//     ease: "ease",
//     onComplete: () => {
//       console.log(_idxArray[1].value);
//     },
//   });
//   tl.to(_boxArray[1], {
//     value: 1.0,
//     duration: 5.0,
//     ease: "ease",
//   });
// }

export { startGsapAnimation, gsapActive };
