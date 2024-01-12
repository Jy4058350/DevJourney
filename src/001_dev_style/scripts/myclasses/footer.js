import { iNode } from "../helper";

class FooterHandler {
  constructor(footer) {
    this.footer = footer;

    this.init();
  }
  init() {
    const siblings = iNode.getElById("footer").previousElementSibling;
    this.siblingsBottom = siblings.getBoundingClientRect().bottom;
    console.log("siblingsBottom", this.siblingsBottom);
    this.footerTop = this.footer.getBoundingClientRect().top;
    console.log("footerTop", this.footerTop);
  }

  getGap() {

   
    return new Promise((resolve) => {
      // iNode.setCssProp("--footer-top", 0, $.footer);
      const nextFvMainRect = $.fv.getBoundingClientRect();
      const nextHomeNewsRect = $.homeNews.getBoundingClientRect();
      const nextFooterRect = $.footer.getBoundingClientRect();
      // console.log("nextFvMainRect", nextFvMainRect);
      console.log("nextHomeNewsRect", nextHomeNewsRect);
      console.log("nextFooterRect", nextFooterRect);

      // const gap = nextFvMainRect.bottom - nextFooterRect.top;
      const gap = nextHomeNewsRect.bottom - nextFooterRect.top;

      console.log("gap", gap);
      iNode.setCssProp("--footer-top", `${gap}`, $.footer);
      resolve();
    });
  }
}

export default FooterHandler;
