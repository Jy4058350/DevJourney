import gsap from "gsap";

const _box = new Map();
function startGsapAnimation(uniforms) {
  const uni = uniforms;
  for (let key in uni) {
    if (!key.startsWith("uProgress")) continue;
    if (key.startsWith("uProgress")) {
      _box.set(key, uni[key]);
      console.log(_box);
    }
  }
}

function gsapActive() {
    console.log(_box);
  const tl = new gsap.timeline({
    onComplete: () => {
      console.log(_box);
      uniforms.uProgress.value = 0;
      uniforms.uIndex.value = 0;
      startGsapAnimation(uniforms);
    },
  });
  // tl.to(uniforms.uProgress, {
  //   value: 1.0,
  //   duration: 1.0,
  //   ease: "ease",
  //   onComplete: () => {
  //     uniforms.uIndex.value = 0;
  //     tl.to(uniforms.uProgress1, {
  //       value: 1.0,
  //       duration: 1.0,
  //       onComplete: () => {
  //         uniforms.uIndex.value = 1;
  //       },
  //     });
  //   },
  // });
}

export { startGsapAnimation, gsapActive };
