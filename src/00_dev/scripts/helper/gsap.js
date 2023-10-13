import gsap from "gsap";

const _box = new Map();
const _idx = new Map();
function startGsapAnimation(uniforms) {
  const uni = uniforms;
  for (let key in uni) {
    if (!key.startsWith("uProgress")) continue;
    if (key.startsWith("uProgress")) {
      _box.set(key, uni[key]);
      //   console.log(_box);
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

function gsapActive() {
  //   console.log(_box);
  const tl = new gsap.timeline({
    onComplete: () => {
      //   console.log(_box);
      _box.forEach((uProgressOf, key) => {
        // console.log(key);
        // console.log(uProgressOf);
        uProgressOf.value = 0;
      });

      //   uniforms.uProgress.value = 0;
      _idx.forEach((uIndexOf, key) => {
        // console.log(key);
        // console.log(uIndexOf);
        uIndexOf.value = 0;
      });
      //   uniforms.uIndex.value = 0;
      // gsapActive();
      //   startGsapAnimation(uniforms);
    },
  });
  console.log(_box);
  console.log(_box.get("uProgress").value);
  console.log(_box.get[0].value);
  //   tl.to(uniforms.uProgress, {
  tl.to(_box[0], {
    value: 1.0,
    duration: 1.0,
    ease: "ease",
    onComplete: () => {
      uniforms.uIndex.value = 0;
      tl.to(uniforms.uProgress1, {
        value: 1.0,
        duration: 1.0,
        onComplete: () => {
          uniforms.uIndex.value = 1;
        },
      });
    },
  });
}

export { startGsapAnimation, gsapActive };
