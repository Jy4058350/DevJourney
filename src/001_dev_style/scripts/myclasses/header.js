import { iNode } from "../helper";

class HeaderHandler {
  constructor(header) {
    this.header = header;

    this.init();
  }

  init() {
    this.goblin = iNode.qs(".Header__FlexItem--logo");
    this.headerNav = iNode.qs(".HorizontalList");
    this.headerBtn = iNode.qs(".btn-menu.Header__Entrance");
    this.headerLogo = iNode.qs(".Header__Icon");
    this.headerMainNav = iNode.qs(".Header__MainNav");
    this.secondNav = iNode.qs(".Header__secondaryNav");
  }

  isWideToggler(element, isWideScreen) {
    console.log("isWideToggler called");

    iNode.toggleClass(this.headerNav, "Header__MainNav--open", true);
    iNode.toggleClass(this.headerMainNav, "Header__MainNav--open", true);
    iNode.toggleClass(this.secondNav, "Header__secondaryNav--open", true);
    iNode.setCssProp("--fv-top", element, fv);
    iNode.setStyles(this.headerNav, { opacity: 1 });
    iNode.setStyles(this.headerBtn, { display: "none" });
    iNode.setStyles(this.headerMainNav, { opacity: 1 });
    iNode.setStyles(this.secondNav, { opacity: 1 });
    iNode.setStyles(this.headerLogo, { display: "none" });
    iNode.toggleClass(this.goblin, "Header__FlexItem--increaseSpace", isWideScreen);
  }

  isNarrowToggler(element, isWideScreen) {
    console.log("isNarrowToggler called");

    iNode.setCssProp("--fv-top", element, fv);
    iNode.toggleClass(this.headerNav, "Header__MainNav--open", false);
    iNode.toggleClass(this.headerMainNav, "Header__MainNav--open", false);
    iNode.setStyles(this.headerNav, { opacity: 0 });
    iNode.setStyles(this.headerBtn, { display: "block" });
    iNode.setStyles(this.headerMainNav, { opacity: 0 });
    iNode.setStyles(this.secondNav, { opacity: 0 });
    iNode.setStyles(this.headerLogo, { display: "block" });
    iNode.toggleClass(this.goblin, "Header__FlexItem--increaseSpace", isWideScreen);
  }
  Hight() {
    this.header.style.height = "145px";
    this.header.style.maxHeight = "145px";
  }

  Row() {
    this.header.style.height = "68px";
    this.header.style.maxHeight = "68px";
  }
}

export default HeaderHandler;
