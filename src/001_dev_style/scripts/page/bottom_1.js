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
  elementPos,
  elementPosHome,
  // homeNews,
  theme,
  menu,
  cling,
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

  (function () {
    let initialY;
    window.onload = function () {
      const initialY = window.scrollY / 0.5;
    };
    const el = iNode.qs(".PageHeader");
    el.style.background = "url(/img/3.png)";
    const el2 = iNode.qs(".PageHeader__ImageWrapper");
    el2.style.backgroundImage = "url(/img/1.jpeg)";
    const el3 = iNode.qs(".Rte");
    const childEl = el3.children[1];
    childEl.style.textAlign = "center";

    const target = iNode.qs(".Image--contrast");
    console.log("initialY", initialY);
    const a = (target.style.transform = `translate3d(0px, ${initialY}px, 0px)`);
    console.log("target", target);
    console.log("a", a);

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
    scrollBar.addListener(({ offset }) => {
      console.log("is scrolling", offset.y);
      const newY = offset.y / 2;
      console.log("newY", newY);

      target.style.transform = `translate3d(0px, ${newY}px, 0px)`;
    });
  })();
}
