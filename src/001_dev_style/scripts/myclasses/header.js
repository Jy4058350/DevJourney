import { iNode } from "../helper";

let value = 0;

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

    this.logoGray = iNode.qs(".Logo__gray");
    this.logoWhite = iNode.qs(".Logo__white");
    this.btnBars = iNode.qsa(".btn-menu_bar");
    this.colorGray = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-gray");
    this.cart = iNode.qs(".Icon--Wrap--clickable");
    this.HeaderFlex = iNode.qs(".Header__FlexItem--logo");
    this.btn = iNode.qs(".btn-menu");
    this.HeaderIcon = iNode.qs(".Header__Icon");
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
    const header = iNode.qs("#header");
    const height = header.offsetHeight;

    // const height = this.header.offsetHeight;
    return height;
  }

  setElHeight(value) {
    // console.log("value", value);
    // const header = iNode.qs("#header");
    // const headerClass = iNode.qs(".Header");

    // headerClass.style.height = `${value}px`;
    // headerClass.style.maxHeight = `${value}px`;

    this.header.style.height = `${value}px`;
    this.header.style.maxHeight = `${value}px`;
    console.log("this.header", this.header);

    // this.header = header;
    // console.log("this.header.height", this.header.style.height);

    const test = iNode.qs(".pin-spacer");
    console.log("test", test);
    if (!test) return this.header;

    if (test) {
      test.style.height = `${value}px`;
      test.style.maxHeight = `${value}px`;
    }
    // return this.header;
  }
}

export default HeaderHandler;
