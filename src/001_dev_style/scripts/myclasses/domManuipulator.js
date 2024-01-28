import { iNode, dom } from "../helper";
import HeaderHandler from "./header";
// import FvHandler from "./fv";

const $ = {};

class DOMManuipulatorClass {
  constructor(header, fv, footer) {
    this.header = header;
    this.fv = fv;
    this.footer = footer;
    this.headerHandler = new HeaderHandler(header);

    const { flexIndicator, flexTarget } = dom;
    this.flexIndicator = flexIndicator;
    this.flexTarget = flexTarget;

    this.resizeTimer;

    this.init();
    this.getHeaderHeight();
  }
  init() {
    this.isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);
    this.toggleScreen(this.isWideScreen);
    this.updateStyle();
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
    this.raiseElement(this.footer);
    this.setElHeight(headerHeight);
    console.log(this.flexIndicator, this.flexTarget);
    this.adjustHeigh(this.flexTarget, this.flexIndicator);
    if (this.isWideScreen) {
      this.updateWideScreenStyle(headerHeight);
    } else {
      this.updateNarrowScreenStyle(headerHeight);
    }
  }

  updateWideScreenStyle(headerHeight) {
    if (this.fv) {
      this.raiseFv(headerHeight);
    }
    iNode.setStyles(this.header, { height: "145px", maxHeight: "145px" });
    iNode.setCssProp("--header-height", 145, this.header);
  }

  updateNarrowScreenStyle(headerHeight) {
    if (this.fv) {
      this.raiseFv(headerHeight);
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
    // const header = iNode.qs("#header");
    const height = this.header.offsetHeight;

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

  // Related footer follows

  raiseElement(el) {
    const prevSibling =
      el.previousElementSibling.getBoundingClientRect().bottom;
    const gap = prevSibling - this.footerTop;
    // this.gapFooter = this.siblingsBottom - this.footerTop;
    // console.log("gapFooter", gapFooter);
    iNode.setCssProp("--footer-top", `${gap}`, el);
  }

  // Related fv follows
  raiseFv(value) {
    return new Promise((resolve) => {
      iNode.setCssProp("--fv-top", value, this.fv);
      resolve();
    });
  }

  // Related flexView(Viewport.class) follows
  adjustHeigh(el1, el2) {
    const height = el1.offsetHeight;
    el2.style.height = `${height}px`;
  }

  // setViewPort(value) {
  //   this.rotationViewPort.style.height = `${value}px`;
  // }
}

export default DOMManuipulatorClass;
