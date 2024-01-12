import { iNode } from "../helper";
import HeaderHandler from "./header";
import FvHandler from "./fv";
import TestClass from "./testClass";

const $ = {};

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.headerHandler = new HeaderHandler(header);
    // this.headerHandler.getHeaderHeight();
    this.fvHandler = new FvHandler(fv);
    this.testClass = new TestClass(); //for test class method

    // this.init();
  }
  init() {
    this.isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);
    this.updateHeaderHeight();
    // console.log("headerHeight", headerHeight);
  }

  updateHeaderHeight(value) {
    this.headerHandler.setElHeight(value);
    if (this.isWideScreen) {
      this.headerHandler.isWideToggler(this.isWideScreen);
      this.fvHandler.raiseFv(value);
    }

    if (!this.isWideScreen) {
      this.headerHandler.isNarrowToggler(this.isWideScreen);
      this.fvHandler.raiseFv(value);
    }
  }

  _getWindowWidth(rootfontsize = 16) {
    return (
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) / rootfontsize
    );
  }
  _toEm(px, rootfontsize) {
    return px / rootfontsize;
  }
}

export default DOMManuipulatorClass;
