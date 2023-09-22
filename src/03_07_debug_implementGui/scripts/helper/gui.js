import GUI from "lil-gui";

const gui = {
  init,
  //   guiOpen,
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
    const o = await import(`../glsl/${type}/index.js`).then(
      ({ default: CustomObject }) => {
        return CustomObject.init({ el, type });
      }
    );
    os.push(o);

    return o;
  });
  console.log(prms);
  await Promise.all(prms);
}

async function guiOpen(os) {
  console.log("guiOpen");
  console.log(os);
  const prms = os.map((o) => {
    folder1
      .add(o.uniforms.uProgress, "value", 0, 1, 0.1)
      .name("action")
      .listen();
  });
  Promise.all(prms);
}

const a = init()
  .then(guiOpen(os))
  .catch((error) => {
    console.log(error);
  });

//   folder1.add(o.uniforms.uProgress, "value", 0, 1, 0.1).name("zaxis").listen();

//   const datData = { next: !!material.uniforms.uProgress.value };
//   folder1
//     .add(datData, "next")
//     .name("moving axis")
//     .onChange(() => {
//       gsap.to(material.uniforms.uProgress, {
//         value: datData.next ? 1 : 0,
//         duration: 3,
//         ease: "ease",
//       });
//     });

export { gui, guiOpen };
