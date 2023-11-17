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
  console.log($.header.offsetHeight);
}

function _clingTo() {
  const height = $.container.offsetHeight;
  let headerHeight = $.header.offsetHeight;
  headerHeight = 200;
  console.log(headerHeight);
  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      // console.log(self.direction);
      // console.log(self.progress);
    },
  });
}

export default cling;
