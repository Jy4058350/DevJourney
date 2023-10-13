import gsap from "gsap";

function startGsapAnimation(uniforms) {
  const tl = new gsap.timeline({
    onComplete: () => {
      console.log(uniforms);
      //   this.uniforms.uProgress.value = 0;
      //   this.uniforms.uIndex.value = 0;
      console.log("Animation sequence complete");
    },
  });
}

export { startGsapAnimation };
