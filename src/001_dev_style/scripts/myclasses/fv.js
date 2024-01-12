import { iNode } from "../helper";

class FvHandler {
  constructor(fv) {
    this.fv = fv;

    this.init();
  }

  init() {}

  raiseFv(value) {
    return new Promise((resolve) => {
      iNode.setCssProp("--fv-top", value, this.fv);
      resolve();
    });
  }
}

export default FvHandler;
