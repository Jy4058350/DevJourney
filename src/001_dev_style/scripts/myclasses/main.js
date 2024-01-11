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
    const isWideScreen = this._getWindowWidth() > this._toEm(1280, 16);

    if (isWideScreen) {
      const nextheaderHeight = this._headerHight();
      this._isWideToggler(nextheaderHeight, isWideScreen);
    }

    if (!isWideScreen) {
      const nextheaderHeight = this._headerHight();
      this._headerRow();
      this._isNarrowToggler(nextheaderHeight, isWideScreen);
    }
    console.log("this.header", this.header);
    const headerHeight = window.getComputedStyle(this.header).height;
    console.log("headerHeight", headerHeight);
  }

  _isWideToggler(nextheaderHeight, isWideScreen) {
    const goblin = iNode.qs(".Header__FlexItem--logo");
    const headerNav = iNode.qs(".HorizontalList");
    const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    const headerLogo = iNode.qs(".Header__Icon");
    const headerMainNav = iNode.qs(".Header__MainNav");
    const secondNav = iNode.qs(".Header__secondaryNav");

    iNode.toggleClass(headerNav, "Header__MainNav--open", true);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", true);
    iNode.toggleClass(secondNav, "Header__secondaryNav--open", true);
    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    iNode.setStyles(headerNav, { opacity: 1 });
    iNode.setStyles(headerBtn, { display: "none" });
    iNode.setStyles(headerMainNav, { opacity: 1 });
    iNode.setStyles(secondNav, { opacity: 1 });
    iNode.setStyles(headerLogo, { display: "none" });
    iNode.toggleClass(goblin, "Header__FlexItem--increaseSpace", isWideScreen);
  }

  _isNarrowToggler(nextheaderHeight, isWideScreen) {
    const goblin = iNode.qs(".Header__FlexItem--logo");
    const headerNav = iNode.qs(".HorizontalList");
    const headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    const headerLogo = iNode.qs(".Header__Icon");
    const headerMainNav = iNode.qs(".Header__MainNav");
    const secondNav = iNode.qs(".Header__secondaryNav");

    iNode.setCssProp("--fv-top", nextheaderHeight, fv);
    iNode.toggleClass(headerNav, "Header__MainNav--open", false);
    iNode.toggleClass(headerMainNav, "Header__MainNav--open", false);
    iNode.setStyles(headerNav, { opacity: 0 });
    iNode.setStyles(headerBtn, { display: "block" });
    iNode.setStyles(headerMainNav, { opacity: 0 });
    iNode.setStyles(secondNav, { opacity: 0 });
    iNode.setStyles(headerLogo, { display: "block" });
    iNode.toggleClass(goblin, "Header__FlexItem--increaseSpace", isWideScreen);
  }

  _headerHight() {
    this.header.style.height = "145px";
    this.header.style.maxHeight = "145px";
  }

  _headerRow() {
    this.header.style.height = "68px";
    this.header.style.maxHeight = "68px";
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
