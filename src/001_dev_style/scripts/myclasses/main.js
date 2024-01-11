import { iNode } from "../helper";

class DOMManuipulatorClass {
  constructor(header, fv, footre) {
    this.header = header;
    this.fv = fv;
    this.footer = footre;
    this.init();
  }
  init() {
    this.run();
  }

  run() {
    this._executeSequence();
  }

  async _executeSequence() {
    try {
      const headerHeight = await iNode.getElementHeight(
        iNode.getElById("header"),
        "Header element is not found"
      );
      // console.log("headerHeight", headerHeight);
      await this._raiseFv(headerHeight);
      await this._calcGapFooterPos();
    } catch (err) {
      console.log("error", err);
    }
  }

  _raiseFv(headerHeight) {
    // console.log("raiseFv");
    return new Promise((resolve) => {
      const fv = iNode.getElById("fv");
      iNode.setCssProp("--fv-top", headerHeight, fv);
      resolve();
    });
  }

  _getPreviousEl(element) {
    return element.previousElementSibling;
  }

  _calcGapFooterPos() {
    const previousEl = this._getPreviousEl(this.footer);

    const homeNews = iNode.qs(".home-news");
    return new Promise((resolve) => {
      // iNode.setCssProp("--footer-top", 0,this.footer);
      // const nextFvMainRect = this.fv.getBoundingClientRect();
      // const nextHomeNewsRect = homeNews.getBoundingClientRect();
      const previousElRect = previousEl.getBoundingClientRect();
      const nextFooterRect = this.footer.getBoundingClientRect();
      // console.log("nextFvMainRect", nextFvMainRect);
      // console.log("nextHomeNewsRect", nextHomeNewsRect);
      console.log("previousElRect", previousElRect);
      console.log("nextFooterRect", nextFooterRect);

      // const gap = nextFvMainRect.bottom - nextFooterRect.top;
      // const gap = nextHomeNewsRect.bottom - nextFooterRect.top;
      const gap = previousElRect.bottom - nextFooterRect.top;

      console.log("gap", gap);
      iNode.setCssProp("--footer-top", `${gap}`, this.footer);
      resolve();
    });
  }
}

export default DOMManuipulatorClass;
