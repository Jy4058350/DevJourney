import Scrollbar from "smooth-scrollbar"; //import with named import
import { dom } from "../helper";

class PageHandler {
  constructor(header, fv, footer, headerHandler, domManuipulator) {
    this.header = header;
    this.fv = fv;
    this.footer = footer;
    this.headerHandler = headerHandler;
    this.domManuipulator = domManuipulator;

    this.resizeTimer;
    this.initialY;
    this.updateHeaderStyle = this.updateHeaderStyle.bind(this);

    const { page, pageHeader, pageWrapper, rte, imgContrast } = dom;
    this.page = page;
    this.pageHeader = pageHeader;
    this.pageWrapper = pageWrapper;
    this.rte = rte;
    this.imgContrast = imgContrast;
    const options = {
      damping: 0.1,
      // delegateTo: document,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
      overFlowBehavior: {
        // x: "hidden",
        y: "scroll",
      },
    };

    this.scrollBar = Scrollbar.init(page, options);
  }

  init() {
    this.addResizeListener();
    this.addScrollBarListener();
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
      this.headerHandler.setElHeight(nextHeight);
    }, 200);
  }

  addScrollBarListener() {
    console.log("addScrollBarListener");

    window.onload = function () {
      this.initialY = window.scrollY / 0.5;
    };

    this.pageHeader.style.background = "url(/img/3.png)";

    this.pageWrapper.style.backgroundImage = "url(/img/1.jpeg)";

    const childEl = this.rte.children[1];
    childEl.style.textAlign = "center";

    this.scrollBarListener(this.scrollBar, this.imgContrast, this.initialY);
  }
  scrollBarListener(initialY) {
    this.scrollBar.addListener(({ offset }) => {
      console.log("is scrolling", offset.y);
      const newY = offset.y / 2;
      console.log("newY", newY);
      this.imgContrast.style.transform = `translate3d(0px, ${initialY}px, 0px)`;
      this.imgContrast.style.transform = `translate3d(0px, ${newY}px, 0px)`;
    });
  }
}

export default PageHandler;
