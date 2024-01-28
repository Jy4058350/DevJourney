import { iNode, dom } from "../helper";
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
    this.resizeTimer;

    this.init();
    this.getHeaderHeight();
  }
  init() {
    // add resize event listener
    this.isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);
    // this.firstView();
    this.toggleScreen(this.isWideScreen);
    this.updateStyle();
    this.addResizeListener();
  }

  _toEm(px, rootfontsize) {
    return px / rootfontsize;
  }

  firstView() {
    if (this.isWideScreen) {
      this.isWideToggler(this.isWideScreen);
    } else {
      this.isNarrowToggler(this.isWideScreen);
    }
  }

  updateStyle() {
    const headerHeight = this.getHeaderHeight();
    this.setElHeight(headerHeight);
    if (this.isWideScreen) {
      this.updateWideScreenStyle(headerHeight);
    } else {
      this.updateNarrowScreenStyle(headerHeight);
    }
  }

  updateWideScreenStyle(headerHeight) {
    if (this.fv) {
      this.fvHandler.raiseFv(headerHeight);
    }
    iNode.setStyles(this.header, { height: "145px", maxHeight: "145px" });
    iNode.setCssProp("--header-height", 145, this.header);
  }

  updateNarrowScreenStyle(headerHeight) {
    if (this.fv) {
      this.fvHandler.raiseFv(headerHeight);
    }
    iNode.setStyles(this.header, { height: "68px", maxHeight: "68px" });
    iNode.setCssProp("--header-height", 68, this.header);
  }

  _getWindowWidth(rootfontsize = 16) {
    return (
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) / rootfontsize
    );
  }

  // related headerClass follows

  toggleScreen(isWideScreen) {
    const displayValue = isWideScreen ? "none" : "block";
    const opacityValue = isWideScreen ? 1 : 0;
    const openValue = isWideScreen;

    iNode.toggleClass(
      dom.headerFlexItem,
      "Header__FlexItem--increaseSpace",
      isWideScreen
    );
    iNode.toggleClass(
      dom.headerHorizontalList,
      "Header__MainNav--open",
      openValue
    );
    iNode.toggleClass(dom.headerMainNav, "Header__MainNav--open", openValue);
    iNode.toggleClass(
      dom.headerSecondNav,
      "Header__secondaryNav--open",
      openValue
    );
    iNode.setStyles(dom.headerHorizontalList, { opacity: opacityValue });
    iNode.setStyles(dom.headerEntrance, { display: displayValue });
    iNode.setStyles(dom.headerMainNav, { opacity: opacityValue });
    iNode.setStyles(dom.headerSecondNav, { opacity: opacityValue });
    iNode.setStyles(dom.headerIcon, { display: displayValue });
  }

  getHeaderHeight() {
    const header = iNode.qs("#header");
    const height = header.offsetHeight;

    iNode.setCssProp("--header-height", height, this.header);

    return height;
  }

  setElHeight(value) {
    this.header.style.height = `${value}px`;
    this.header.style.maxHeight = `${value}px`;

    const pinSpacer = iNode.qs(".pin-spacer");
    if (pinSpacer) {
      pinSpacer.style.height = `${value}px`;
      pinSpacer.style.maxHeight = `${value}px`;
    }
  }

  addResizeListener() {
    console.log("addResizeListener");
    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimer);
      this.updateStyle();
    });
  }

  // updateStyle() {
  //   resizeTimer = setTimeout(() => {
  //     let height = 0;
  //     domManuipulator.init();
  //     const headerHeight = domManuipulator.getHeaderHeight();
  //     console.log("resize_headerHeight before update", headerHeight);
  //     domManuipulator.updateStyle(headerHeight);
  //     height = domManuipulator.getHeaderHeight();
  //     console.log("resize_headerHeight after update", height);
  //     domManuipulator.setElHeight(height);

  //     fvHandler.raiseFv(height);
  //     const portHeight = newsViewport.getPort();
  //     newsViewport.setViewPort(portHeight);
  //   }, 200);
  // }

  //     },
  //   });
  // }
}

export default DOMManuipulatorClass;
