class PageHandler {
  constructor(header, fv, footer, headerHandler, domManuipulator) {
    this.header = header;
    this.fv = fv;
    this.footer = footer;
    this.headerHandler = headerHandler;
    this.domManuipulator = domManuipulator;

    this.resizeTimer;
    this.updateHeaderStyle = this.updateHeaderStyle.bind(this);
  }

  init() {
    this.addResizeListener();
  }

  addResizeListener() {
    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimer);
      this.updateHeaderStyle();
    });
  }

  updateHeaderStyle() {
    this.resizeTimer = setTimeout(() => {
      let nextHeight = 0;
      this.domManuipulator.init();
      const headerHeight = this.headerHandler.getHeaderHeight();
      this.domManuipulator.updateStyle(headerHeight);
      nextHeight = this.headerHandler.getHeaderHeight();
      headerHandler.setElHeight(nextHeight);
    }, 200);
  }
}

export default PageHandler;
