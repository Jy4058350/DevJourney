import Scrollbar from "smooth-scrollbar"; //import with named import
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";

import { iNode } from "../helper";

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
  const header = iNode.getElById("header");
  const fv = iNode.getElById("fv");
  const footer = iNode.getElById("footer");
  const rotationViewPort = iNode.qs(".rotation-viewport");
  const referenceView = iNode.qs(".home-news-article-thumbnail");
  const sliders = iNode.qs(".rotation-slider");
  const prevButton = iNode.qs(".home-news-control-button.Previous");
  const nextButton = iNode.qs(".home-news-control-button.Next");

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);

  domManuipulator.init();

  const headerHeight = headerHandler.getHeaderHeight();

  domManuipulator.updateStyle(headerHeight);
  // const portHeight = newsViewport.getPort();
  // newsViewport.setViewPort(portHeight);

  let resizeTimer;

  window.addEventListener("resize", {
    handleEvent(event) {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        let height = 0;
        domManuipulator.init();
        const headerHeight = headerHandler.getHeaderHeight();
        domManuipulator.updateStyle(headerHeight);
        height = headerHandler.getHeaderHeight();
        headerHandler.setElHeight(height);
      }, 200);
    },
  });

  // test code for bottom_1.scss

  (function (addScrollBarListener) {
    let initialY;
    window.onload = function () {
      initialY = window.scrollY / 0.5;
    };

    const el = iNode.getElement(".PageHeader");
    // el.style.background = "url(/img/3.png)";

    const el2 = iNode.getElement(".PageHeader__ImageWrapper");
    // el2.style.backgroundImage = "url(/img/1.jpeg)";

    const el3 = iNode.getElement(".Rte");
    // const childEl = el3.children[1];
    // childEl.style.textAlign = "center";

    const el4 = iNode.getElement(".Image--contrast");

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

    const scrollBar = Scrollbar.init(pageContainer, options);
    addScrollBarListener(scrollBar, el4, initialY);
  })(function (scrollBar, el4, initialY) {
    scrollBar.addListener(({ offset }) => {
      console.log("is scrolling", offset.y);
      const newY = offset.y / 2;
      // el4.style.transform = `translate3d(0px, ${initialY}px, 0px)`;
      // el4.style.transform = `translate3d(0px, ${newY}px, 0px)`;
    });
  });
}
