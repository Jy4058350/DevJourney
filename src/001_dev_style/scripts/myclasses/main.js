import _ from "lodash";
import { iNode } from "../helper";

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.init();
  }
  init() {
    this._updateHeaderHeight();
  }

  _updateHeaderHeight() {
    console.log("this.header", this.header);
    const headerHeight = window.getComputedStyle(this.header).height;
    console.log("headerHeight", headerHeight);
  }
}

export default DOMManuipulatorClass;
