import { iNode } from "../helper";

class ViewPort {
  constructor(rotationViewPort, referenceView) {
    this.rotationViewPort = rotationViewPort;
    this.referenceView = referenceView;
    
    this.init();
  }
  init() {
    this.getPort();
  }

  getPort() {
    const height = this.referenceView.offsetHeight;
    return height;
  }

  setViewPort(value) {
    this.rotationViewPort.style.height = `${value}px`;
  }
}

export default ViewPort;
