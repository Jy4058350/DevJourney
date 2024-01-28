import { iNode } from "../helper";

class FooterHandler {
  constructor(footer) {
    this.footer = footer;

    // this.init();
    // this.gap = this.getGap();
  }
  // init() {
  //   const siblings = iNode.getElById("footer").previousElementSibling;
  //   this.siblingsBottom = siblings.getBoundingClientRect().bottom;
  //   // console.log("siblingsBottom", this.siblingsBottom);
  //   this.footerTop = this.footer.getBoundingClientRect().top;
  //   // console.log("footerTop", this.footerTop);
  //   this.setFooterPos();
  // }

  // getGap() {
  //   const gap = this.siblingsBottom - this.footerTop;
  //   // console.log("gap", gap);
  // }

  // setFooterPos() {
  //   iNode.setCssProp("--footer-top", `${this.gap}`, this.footer);
  // }
}

export default FooterHandler;
