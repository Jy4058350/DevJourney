import { AxesHelper } from "three";
import world from "../glsl/world";

const orbit = {
  Go,
  Run,
  Stop,
};

function Go() {
  if (window.debug) {
    Run();
  } else {
    Stop();
  }
}

function Run() {
  if (!window.debug) return;

  import("three/examples/jsm/controls/OrbitControls")
    .then((module) => {
      const { OrbitControls } = module;
      const controls = new OrbitControls(
        world.camera,
        world.renderer.domElement
      );
      world.renderer.domElement.style.zIndex = 10;
      controls.enableDamping = true;
      const axis = new AxesHelper(1000);
      world.scene.add(axis);
    })
    .catch((e) => {
      console.log(e);
    });
}

function Stop() {
  if (window.debug) {
    world.renderer.domElement.style.zIndex = -100;
  }
}

export { orbit };
