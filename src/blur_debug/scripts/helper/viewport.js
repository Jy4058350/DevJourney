import { iNode } from "../../../iNode.js";

const viewport = {
    init,
};


function init() {
    const canvas = iNode.qs("#canvas");
    const canvasRect = canvas.getBoundingClientRect();
    
    viewport.cameraWidth = canvasRect.width;
    viewport.cameraHeight = canvasRect.height;
    viewport.near = 1500;
    viewport.far = 4000;
    viewport.aspect = viewport.cameraWidth / viewport.cameraHeight;
    viewport.cameraZ = 2500;
    viewport.radian = 2 * Math.atan(viewport.cameraHeight / 2 / viewport.cameraZ);
    viewport.fov = viewport.radian * (180 / Math.PI);

}

export default viewport;
