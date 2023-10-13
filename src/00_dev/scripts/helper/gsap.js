import gsap from "gsap";

function startGsapAnimation() {
  const uniforms = super.fixUniforms();
  const tl = new gsap.timeline({
    onComplete: () => {
      console.log(this.uniforms.uProgress.value);
      //   this.uniforms.uProgress.value = 0;
      //   this.uniforms.uIndex.value = 0;
      console.log("Animation sequence complete");
    },
  });
}

export { startGsapAnimation };
