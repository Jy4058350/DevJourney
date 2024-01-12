import { iNode } from "../helper";
import HeaderHandler from "./header";
import FvHandler from "./fv";
import TestClass from "./testClass";

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.headerHandler = new HeaderHandler(header);
    this.fvHandler = new FvHandler(fv);
    this.testClass = new TestClass(); //for test class method

    this.init();
  }
  init() {
    this._updateHeaderHeight();

    // this.callTestClassMethod();//for test class method
  }

  _updateHeaderHeight(headerHandler) {
    const isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);

    if (isWideScreen) {
      const getHeaderHeight = this.headerHandler.Hight();
      this.headerHandler.Hight();
      this.headerHandler.isWideToggler(getHeaderHeight, isWideScreen);
    }

    if (!isWideScreen) {
      const getHeaderHeight = this.headerHandler.Row();
      this.headerHandler.Row();
      this.headerHandler.isNarrowToggler(getHeaderHeight, isWideScreen);
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
