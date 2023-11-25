import gsap from "gsap";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar"; //import with named import
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scroll = {
  initScroller,
  disablePlugin,
  enablePlugin,
};

function initScroller() {
  gsap.registerPlugin(ScrollTrigger);

  // Calling the plugin
  Scrollbar.use(DisablePlugin);

  const pageContainer = document.querySelector("#page-container");

  const options = {
    damping: 0.1,
    // delegateTo: document,
    renderByPixels: true,
    alwaysShowTracks: false,
    continuousScrolling: true,
  };

  const scrollBar = Scrollbar.init(pageContainer, options);

  scrollBar.addListener(({ offset }) => {
    const boundedOffset = Math.max(0, Math.min(offset.y, 100));
    scrollBar.setPositon(boundedOffset);
  });

  scroll.scrollBar = scrollBar;

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

  const el = document.querySelector("[data-webgl]");
}

// disable scrollbar plugin description
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

export { scroll };
