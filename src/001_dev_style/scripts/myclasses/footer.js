import { iNode } from "../helper";

class FooterHandler {
  constructor(footer) {
    this.footer = footer;

    this.init();
  }
  init() {
   const siblings = iNode.getElById("footer").previousElementSibling;
   console.log("siblings", siblings);
  }

  getFooterPos() {
    // console.log("calcGapFooterPos");
    $.fv = iNode.getElById("fv");
    $.footer = iNode.getElById("footer");
    $.homeNews = iNode.qs(".home-news");
    // console.log("$.homeNews", $.homeNews);
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
