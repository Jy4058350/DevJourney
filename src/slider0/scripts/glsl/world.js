import { WebGLRenderer, Scene, PerspectiveCamera } from "three";
import viewport from "../helper/viewport";

const world = {
    os: [],
    init,
};


function init(viewport) {
    
    world.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });
    world.renderer.setSize(viewport.width, viewport.height, false);
    world.renderer.setClearColor(0xffffff);
    document.body.appendChild(world.renderer.domElement);
    
    world.scene = new Scene();
    world.camera = _setupPerspectiveCamera(viewport);
}

function _setupPerspectiveCamera(viewport) {
    const { fov, near, far, cameraZ, aspect} = viewport;
    const camera = new PerspectiveCamera (
        fov,
        aspect,
        near,
        far
    );
    camera.position.z = cameraZ;
    return camera;
}



export default world;
