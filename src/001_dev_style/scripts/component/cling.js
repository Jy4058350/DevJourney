import { scroll } from "./scroll.js";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar"; //import with named import
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { iNode } from "../helper";

class DisablePlugin extends ScrollbarPlugin {
  static pluginName = "disablePlugin";
  static defaultOptions = {
    disabled: false,
  };

  transformDelta(delta) {
    // console.log(delta);
    delta = this.options.disabled ? { x: 0, y: 0 } : delta;
    return delta;
  }
}
// switch off the plugin
function disablePlugin() {
  scroll.scrollBar.updatePluginOptions("disablePlugin", {
    disabled: true,
  });
}

// switch on the plugin
function enablePlugin() {
  scroll.scrollBar.updatePluginOptions("disablePlugin", {
    disabled: false,
  });
}

const cling = {
  init,
  _clingTo,
};

const $ = {};

function init() {
  $.container = iNode.qs("#global-container");
  $.header = iNode.qs("#Header");
}

// function _clingTo() {
//   // $.container.classList.toggle("is-cling");
//   $.header.classList.toggle("is-cling");
//   scroll.disablePlugin();
//   console.log("cling");
// }

function _clingTo() {
  const height = $.container.offsetHeight;
  console.log(height);
  ScrollTrigger.create({
    trigger: $.header,
    start: "top top",
    // end: "bottom+=1000px top",
    // end: "bottom+=539px top",
    end: `bottom+=${height}px top`,
    // end: "bottom ${bottomPage}px top",
    // markers: true,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      console.log(self.direction);
      console.log(self.progress);
    },
  });
}

export default cling;
