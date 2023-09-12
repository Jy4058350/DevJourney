import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import { iNode } from "../../../iNode";

import world from "../glsl/world";

const scroller = {
  init,
};

function init() {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = iNode.qs("#page-container");

  const scrollBar = Scrollbar.init(pageContainer, { delegateTo: document });

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      if (arguments.length) {
        scrollBar.scrollTop = value; // setter
      }
      return scrollBar.scrollTop; // getter
    },
    // getBoundingClientRect() {
    //   return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    // }
  });
  scrollBar.addListener(ScrollTrigger.update);

  ScrollTrigger.defaults({
    scroller: pageContainer,
  });

  const el = iNode.qs("[data-webgl]");

  const meshX = world.os[0].mesh.position.x;
  const meshY = world.os[0].mesh.position.y;
  const animation = {
    rotation: 0,
    x: meshX,
    y: meshY,
  };
  gsap.to(animation, {
    rotation: Math.PI * 2,
    x: meshX,
    y: meshY,
    scrollTrigger: {
      trigger: el,
      start: "cemter 50%",
      // end: "top 30%",
      scrub: true,
      pin: true,
    },
    onUpdate() {
      world.os[0].mesh.position.x = animation.x;
      world.os[0].mesh.rotation.z = animation.rotation;
    },
  });
}

export default scroller;
