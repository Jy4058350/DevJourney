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
    this.headerHandler.getHeaderHeight1();
    this.fvHandler = new FvHandler(fv);
    this.testClass = new TestClass(); //for test class method

    // this.init();
  }
  init() {
    this.isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);
    // const headerHeight = this.headerHandler.getHeaderHeight();
    // console.log("headerHeight", headerHeight);
    this._updateHeaderHeight();
    // console.log("headerHeight", headerHeight);
    
  }
  
  _updateHeaderHeight(value) {
    if (this.isWideScreen) {
      // const getHeaderHeight = this.headerHandler.Hight();
      // console.log("getHeaderHeight", getHeaderHeight);
      // this.headerHandler.Hight(value);
      this.headerHandler.isWideToggler(this.isWideScreen);
      // this.fvHandler.raiseFv(value);
    }

    if (!this.isWideScreen) {
      const getHeaderHeight = this.headerHandler.Row();
      this.headerHandler.Row();
      this.headerHandler.isNarrowToggler(getHeaderHeight, this.isWideScreen);
      this.fvHandler.raiseFv(getHeaderHeight);
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
