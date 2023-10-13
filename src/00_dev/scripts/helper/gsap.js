import gsap from "gsap";

function startGsapAnimation() {
  const tl = new gsap.timeline({
    onComplete: () => {
      console.log(this.uniforms);
      // this.uniforms.uProgress.value = 0;
      // this.uniforms.uIndex.value = 0;
    },
  });
}

export { startGsapAnimation };
