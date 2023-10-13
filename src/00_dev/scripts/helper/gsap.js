import gsap from "gsap";

function startGsapAnimation(uniforms) {
  console.log(uniforms);
  let idx = 0;
  for (let i = 0; i < 5; i++) {
    idx = i;
    uProgress = `uProgress${idx}`;
    console.log(uProgress);
  }
  //   const tl = new gsap.timeline({
  //     onComplete: () => {
  //       //   console.log(uniforms);
  //       uniforms.uProgress.value = 0;
  //       uniforms.uIndex.value = 0;
  //       startGsapAnimation(uniforms);
  //     },
  //   });
  //   tl.to(uniforms.uProgress, {
  //     value: 1.0,
  //     duration: 1.0,
  //     ease: "ease",
  //     onComplete: () => {
  //       uniforms.uIndex.value = 0;
  //       tl.to(uniforms.uProgress1, {
  //         value: 1.0,
  //         duration: 1.0,
  //         onComplete: () => {
  //           uniforms.uIndex.value = 1;
  //         },
  //       });
  //     },
  //   });
}

export { startGsapAnimation };
