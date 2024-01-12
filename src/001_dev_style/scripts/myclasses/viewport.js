import { iNode } from "../helper";

class ViewPort {
  constructor(rotationViewPort, homeNewsViewPort) {
    this.rotationViewPort = rotationViewPort;
    this.homeNewsViewPort = homeNewsViewPort;
    this.init();
  }
  init() {
    this.getHomeNewsHeight();
  }

  getHomeNewsHeight() {
    const height = this.homeNewsViewPort.offsetHeight;
    console.log("homeNews_height", height);
    return height;
  }

  setViewPort(value) {
    console.log("this.rotationViewPort", this.rotationViewPort);
    this.rotationViewPort.style.height = `${value}px`;
  }
}

export default ViewPort;
