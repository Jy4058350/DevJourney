import { iNode } from "../helper";
import HeaderHandler from "./header";
import FvHandler from "./fv";
import FooterHandler from "./footer";

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
    // console.log("this.isWideScreen", this.isWideScreen);
    if (this.isWideScreen) {
      this.headerHandler.isWideToggler(this.isWideScreen);
    }
    if (!this.isWideScreen) {
      this.headerHandler.isNarrowToggler(this.isWideScreen);
    }
  }

  updateStyle() {
    // console.log("this.isWideScreen", this.isWideScreen);
    const headerHeight = this.headerHandler.getHeaderHeight();
    // console.log("updateStyle_headerHeight", headerHeight);
    this.headerHandler.setElHeight(headerHeight);
    if (this.isWideScreen) {
      console.log("this.isWideScreen is true", this.isWideScreen);
      this.headerHandler.isWideToggler(this.isWideScreen);
      if (this.fv) {
        this.fvHandler.raiseFv(headerHeight);
      }
      iNode.setStyles(this.header, { height: "145px", maxHeight: "145px" });
      iNode.setStyles(this.header, { height: "145px", maxHeight: "145px" });
    }

    if (!this.isWideScreen) {
      console.log("this.isWideScreen is false", this.isWideScreen);
      this.headerHandler.isNarrowToggler(this.isWideScreen);
      if (this.fv) {
        this.fvHandler.raiseFv(headerHeight);
      }
      iNode.setStyles(this.header, { height: "68px", maxHeight: "68px" });
      iNode.setStyles(this.header, { height: "68px", maxHeight: "68px" });
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
