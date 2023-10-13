import gsap from "gsap";

function startGsapAnimation(uniforms) {
  const tl = new gsap.timeline({
    onComplete: () => {
      console.log(uniforms);
        uniforms.uProgress.value = 0;
        uniforms.uIndex.value = 0;
    //   console.log("Animation sequence complete");
    },
  });
}

export { startGsapAnimation };
