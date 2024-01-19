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
    this.fv = iNode.qs(".fv");
    this.homeNews = iNode.qs(".home-news");
    this.footer = iNode.qs(".Footer");

    this.headerWrap = iNode.qs(".Header__Wrap");
    this.sectionTemplate = iNode.qs(".section--home-panels");
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
    this.clingToStyleOnEnter();
    this.clingToStyleOnLeaveBack();
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
    console.log("height", height);

    iNode.setCssProp("--header-height", height, this.header);

    console.log("this.header", this.header);
    return height;
  }

  setElHeight(value) {
    // iNode.setCssProp("--header-height", value, this.header);
    this.header.style.height = `${value}px`;
    this.header.style.maxHeight = `${value}px`;
    // console.log("this.header", this.header);

    const pinSpacer = iNode.qs(".pin-spacer");
    // console.log("pinSpacer", pinSpacer);
    if (!pinSpacer) return this.header;

    if (pinSpacer) {
      pinSpacer.style.height = `${value}px`;
      pinSpacer.style.maxHeight = `${value}px`;
    }
    // return this.header;
  }

  clingToStyleOnEnter() {
    iNode.toggleClass(this.headerWrap, "Header--white", true);
    // iNode.toggleClass(header, "Header--white", true);

    iNode.setStyles(this.logoGray, { opacity: 1 });
    iNode.setStyles(this.logoWhite, { opacity: 0 });
    this.btnBars.forEach((btnBar) => {
      iNode.setStyles(btnBar, { backgroundColor: "var(--color-gray)" });
    });
    iNode.setStyles(this.cart, { color: "var(--color-gray)" });
    iNode.setStyles(this.headerMainNav, { color: "var(--color-gray)" });
    iNode.setStyles(this.secondNav, { color: "var(--color-gray)" });
  }

  clingToStyleOnLeaveBack() {
    iNode.toggleClass(this.headerWrap, "Header--white", false);
    // iNode.toggleClass(header, "Header--white", false);
    iNode.setStyles(this.logoGray, { opacity: 0 });
    iNode.setStyles(this.logoWhite, { opacity: 1 });
    this.btnBars.forEach((btnBar) => {
      iNode.setStyles(btnBar, { backgroundColor: "var(--color-border)" });
    });
    iNode.setStyles(this.cart, { color: "var(--color-border)" });
    iNode.setStyles(this.headerMainNav, { color: "var(--color-border)" });
    iNode.setStyles(this.secondNav, { color: "var(--color-border)" });
  }
}

export default HeaderHandler;
