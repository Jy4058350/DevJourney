import Scrollbar from "smooth-scrollbar"; //import with named import
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";
import PageHandler from "../myclasses/pagesHandler";

import { iNode, dom } from "../helper";

export default async function init({
  world,
  mouse,
  loader,
  viewport,
  scroller,
  theme,
  menu,
  clingHeader,
}) {
  const { header, fv, footer } = dom;

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);
  const pageHandler = new PageHandler(header, fv, footer, headerHandler, domManuipulator);
  pageHandler.init();

  const headerHeight = headerHandler.getHeaderHeight();

  domManuipulator.updateStyle(headerHeight);

  let resizeTimer;

  // window.addEventListener("resize", () => {
  //   clearTimeout(resizeTimer);

  //   updateHeaderStyle();
  // });

  // function updateHeaderStyle() {
  //   resizeTimer = setTimeout(() => {
  //     let nextHeight = 0;
  //     domManuipulator.init();
  //     const headerHeight = headerHandler.getHeaderHeight();
  //     domManuipulator.updateStyle(headerHeight);
  //     nextHeight = headerHandler.getHeaderHeight();
  //     headerHandler.setElHeight(nextHeight);
  //   }, 200);
  // }

  // test code for bottom_1.scss

  (function (addScrollBarListener) {
    let initialY;
    const { page, pageHeader, pageWrapper, rte, imgContrast } = dom;

    window.onload = function () {
      initialY = window.scrollY / 0.5;
    };

    pageHeader.style.background = "url(/img/3.png)";

    pageWrapper.style.backgroundImage = "url(/img/1.jpeg)";

    const childEl = rte.children[1];
    childEl.style.textAlign = "center";

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

    const scrollBar = Scrollbar.init(page, options);
    addScrollBarListener(scrollBar, imgContrast, initialY);
  })(function (scrollBar, imgContrast, initialY) {
    scrollBar.addListener(({ offset }) => {
      console.log("is scrolling", offset.y);
      const newY = offset.y / 2;
      console.log("newY", newY);
      imgContrast.style.transform = `translate3d(0px, ${initialY}px, 0px)`;
      imgContrast.style.transform = `translate3d(0px, ${newY}px, 0px)`;
    });
  });
}
