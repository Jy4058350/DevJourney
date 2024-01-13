import { iNode } from "../helper";
import HeaderHandler from "./header";
import FvHandler from "./fv";
import FooterHandler from "./footer";
import { head } from "lodash";

const $ = {};

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.headerHandler = new HeaderHandler(header);
    this.fvHandler = new FvHandler(fv);
    this.footerHandler = new FooterHandler(footre);

    this.init();
  }
  init() {
    this.isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);
    this.firstView();
  }

  firstView() {
    console.log("this.isWideScreen", this.isWideScreen);
    if (this.isWideScreen) {
      this.headerHandler.isWideToggler(this.isWideScreen);
    }
    if (!this.isWideScreen) {
      this.headerHandler.isNarrowToggler(this.isWideScreen);
    }
  }

  updateStyle(value) {
    console.log("this.isWideScreen", this.isWideScreen);
    this.headerHandler.setElHeight(value);
    if (this.isWideScreen) {
      console.log("this.isWideScreen is true", this.isWideScreen);
      this.headerHandler.isWideToggler(this.isWideScreen);
      this.fvHandler.raiseFv(value);
    }

    if (!this.isWideScreen) {
      console.log("this.isWideScreen is false", this.isWideScreen);
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
