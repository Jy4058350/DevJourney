import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";
import { theme } from "./component/theme";
import { gui } from "./helper/gui";
import menu from "./component/menu";
import cling from "./component/cling";
import "./component/scroll-animation";
import gsap from "gsap";

import { elementPos } from "./component/elementpos";

window.debug = debugmode(1) ? 1 : 0;

function debugmode(d) {
  return d && import.meta.env.DEV;
}

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  if (window.debug) {
    await gui.init();
  }

  elementPos.init();
  elementPos.resizeHeaderPos();
  elementPos.resizingFooterPos();
  elementPos.wideRangeGoblin();

  viewport.init(canvasRect);

  scroll.initScroller();

  loader.loadDom();

  loader.addProgressAction(function _progressAction(loaded, total) {
    const percent = Math.floor((loaded / total) * 100);
    loader.$.p.innerHTML = `${percent} %`;
    loader.$.b.style.width = `${percent}%`;
  });

  viewport.bindResizeEvents();

  await loader.init();
  theme.init();

  menu.init();
  cling.init();
  cling._clingTo();

  elementPos.executeSequence();

  await world.init(canvasRect, viewport);

  mouse.init();

  world.render();

  loader.loadingAnimation();

  gui.open();

  // document.addEventListener("mousemove", function (event) {
  //   gsap.globalTimeline.getChildren().forEach((timeline) => {
  //     timeline.play();
  //     console.log("gsap.play");
  //   });
  // });

  document.addEventListener("mousemove", function (event) {
    const timelines = gsap.globalTimeline.getChildren();

    if (timelines.length > 0) {
      timelines.forEach((timeline) => {
        timeline.play();
        console.log("gsap.play");
      });
    } else {
      console.log("No Gsap timeline found");
    }
  });
}
