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
  console.log($.header);
  console.log($.container);
}

function _clingTo() {
  $.container.classList.toggle("is-cling");
  scroll.disablePlugin();
  console.log("cling");
}

export default cling;
