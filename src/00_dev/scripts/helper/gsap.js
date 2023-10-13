import gsap from "gsap";

function startGsapAnimation(uniforms) {
  let progs = [];
  const uProgress = uniforms.uProgress;
//   console.log(uProgress);
  for (let i = 1; i < 5; i++) {
      console.log(uniforms.uProgress[1]);
    const prog = `uProgress${i}`;
    // console.log(progs);
    // progs.push(prog);
    // console.log(progs);
    // const x = uniforms.progs[i].value;
    // console.log(x);
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
