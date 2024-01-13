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
    this.white = iNode.qs(".Header--white");
    console.log("this.white", this.white);
  }

  isWideToggler(isWideScreen) {
    iNode.toggleClass(
      this.goblin,
      "Header__FlexItem--increaseSpace",
      isWideScreen
    );
    iNode.toggleClass(this.headerNav, "Header__MainNav--open", true);
    iNode.toggleClass(this.headerMainNav, "Header__MainNav--open", true);
    iNode.toggleClass(this.secondNav, "Header__secondaryNav--open", true);
    iNode.setStyles(this.headerNav, { opacity: 1 });
    iNode.setStyles(this.headerBtn, { display: "none" });
    iNode.setStyles(this.headerMainNav, { opacity: 1 });
    iNode.setStyles(this.secondNav, { opacity: 1 });
    iNode.setStyles(this.headerLogo, { display: "none" });
  }

  isNarrowToggler(isWideScreen) {
    iNode.toggleClass(
      this.goblin,
      "Header__FlexItem--increaseSpace",
      isWideScreen
    );
    iNode.toggleClass(this.headerNav, "Header__MainNav--open", false);
    iNode.toggleClass(this.headerMainNav, "Header__MainNav--open", false);
    iNode.setStyles(this.headerNav, { opacity: 0 });
    iNode.setStyles(this.headerBtn, { display: "block" });
    iNode.setStyles(this.headerMainNav, { opacity: 0 });
    iNode.setStyles(this.secondNav, { opacity: 0 });
    iNode.setStyles(this.headerLogo, { display: "block" });
  }

  getHeaderHeight() {
    const height = this.header.offsetHeight;
    return height;
  }

  setElHeight(value) {
    this.header.style.height = `${value}px`;
    this.header.style.maxHeight = `${value}px`;
    console.log("this.header", this.header);

    return value;
  }
}

export default HeaderHandler;
