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

  // Related footer follows
  init() {
    const siblings = this.footer.previousElementSibling;
    console.log("siblings", siblings);
    const siblingsBottom = siblings.getBoundingClientRect().bottom;
    // console.log("siblingsBottom", this.siblingsBottom);
    this.footerTop = this.footer.getBoundingClientRect().top;
    // console.log("footerTop", this.footerTop);
    this.setFooterPos();
  }

  getGap() {
    this.gap = this.siblingsBottom - this.footerTop;
    // console.log("gap", gap);
  }

  setFooterPos() {
    iNode.setCssProp("--footer-top", `${this.gap}`, this.footer);
  }
}

export default DOMManuipulatorClass;
