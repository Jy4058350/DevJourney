import GUI from "lil-gui";

const gui = {
  init,
};

const os = [];

async function init() {
  if (!window.debug) return;
  const gui = new GUI();
  const folder1 = gui.addFolder("action");
  folder1.open();

  const els = document.querySelectorAll("[data-webgl]");
  const prms = [...els].map(async (el) => {
    const type = el.dataset.webgl;
    // console.log(type);
    const o = await import(`../glsl/${type}/index.js`)
      .then(({ default: CustomObject }) => {
        return CustomObject.init({ el, type });
      })
      .then((o) => {
        if (!o.uniforms) return;
        folder1
          .add(o.uniforms.uProgress, "value", 0, 1, 0.1)
          .name("zaxis")
          .listen();
        return o;
      })
      .then((o) => {
        if (!o.uniforms) return;
        const datData = { next: !!o.uniforms.uProgress.value };
        folder1
          .add(datData, "next")
          .name("actions")
          .onChange(() => {
            gsap.to(o.uniforms.uProgress, {
              value: datData.next ? 1 : 0,
              duration: 3,
              ease: "ease",
            });
          });
        return o;
      });

    os.push(o);
    return o;
  });
  await Promise.all(prms);

  //   folder1.add(o.uniforms.uProgress, "value", 0, 1, 0.1).name("zaxis").listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("moving axis")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });
}

export { gui };
