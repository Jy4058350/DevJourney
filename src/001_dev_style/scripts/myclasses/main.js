import { iNode } from "../helper";
import HeaderHandler from "./header";
import TestClass from "./testClass";

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.headerHandler = new HeaderHandler(header);
    this.testClass = new TestClass();

    this.init();
  }
  init() {
    this._updateHeaderHeight();
    // this.callHeaderHandlerMethod();

    // this.callTestClassMethod();//for test class method
  }
  callHeaderHandlerMethod() {
    this.headerHandler._isWideToggler();
    this.headerHandler._isNarrowToggler();
  }

  _updateHeaderHeight(headerHandler) {
    const isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);

    if (isWideScreen) {
      const nextheaderHeight = this.headerHight();
      this._headerHight();
      this.headerHandler.isWideToggler(nextheaderHeight, isWideScreen);
    }

    if (!isWideScreen) {
      const nextheaderHeight = this.headerHandler.Row();
      this.headerHandler.Row();
      this.headerHandler.isNarrowToggler(nextheaderHeight, isWideScreen);
    }
    const headerHeight = window.getComputedStyle(this.header).height;
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
