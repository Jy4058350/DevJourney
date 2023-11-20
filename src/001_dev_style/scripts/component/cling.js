import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  $.container = iNode.qs("#global-container");
  $.header = iNode.qs("#header");


  // $.LogoGray = iNode.qs(".Logo__gray") 
  // console.log($.LogoGray);
  // const computedStyle = getComputedStyle($.LogoGray);
  // console.log(computedStyle.opacity);
}

function _clingTo() {
  const height = $.container.offsetHeight;
 $.LogoGray = iNode.qs(".Logo__gray") 
  console.log($.LogoGray);
  const computedStyle = getComputedStyle($.LogoGray);
  console.log(computedStyle.opacity);


  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      const header = iNode.qs("#header");
      if (self.direction === 1) {
        header.classList.add("Header--white");
        computedStyle.opacity = 1;
      } else {
        header.classList.remove("Header--white");
      }
    },
  });
}

export default cling;
