import { iNode } from "../helper";

class HeaderHandler {
  constructor() {}

  init() {
    this._isWideToggler();
    this._isNarrowToggler();
  }

  hellow() {
    console.log("hellow");
  }

  _isWideToggler(nextheaderHeight, isWideScreen) {
    console.log("isWideToggler called");
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
}

export default HeaderHandler;
