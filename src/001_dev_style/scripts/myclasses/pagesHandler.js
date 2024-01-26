class PageHandler {
  constructor(header, fv, footer) {
    this.header = header;
    this.fv = fv;
    this.footer = footer;

    this.resizeTimer;
    // this.updateHeaderStyle = this.updateHeaderStyle.bind(this);

    // this.init();
    console.log("pageHandler constructor");
  }

  init() {
    console.log("pageHandler init");
  }

  //   addResizeListener(resizeTimer, updateHeaderStyle) {
  //     window.addEventListener("resize", () => {
  //       clearTimeout(resizeTimer);
  //       updateHeaderStyle();
  //     });
  //   }

  //   updateHeaderStyle() {
  //     resizeTimer = setTimeout(() => {
  //       let nextHeight = 0;
  //       domManuipulator.init();
  //       const headerHeight = headerHandler.getHeaderHeight();
  //       domManuipulator.updateStyle(headerHeight);
  //       nextHeight = headerHandler.getHeaderHeight();
  //       headerHandler.setElHeight(nextHeight);
  //     }, 200);
  //   }
}

export default PageHandler;
