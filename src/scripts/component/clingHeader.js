import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { iNode } from "../helper";
import HeaderHandler from "../myclasses/header";

const headerHandler = new HeaderHandler();

gsap.registerPlugin(ScrollTrigger);

const cling = {
  init,
};

function init(header, footer) {
  const height = _scrollTriggerEnd(main, footer);
  if (!ScrollTrigger) {
    console.error("ScrollTrigger is not defined");
    return;
  }

  ScrollTrigger.create({
    trigger: header,
    start: "top top",
    end: `bottom+=${height}px top`,
    pin: true,
    pinSpacing: false,
    onEnter: () => {
      headerHandler.clingToStyleOnEnter();
    },
    onLeaveBack: () => {
      headerHandler.clingToStyleOnLeaveBack();
    },
  });
}

// function getChildEls(el) {
//   const childArray = el.children;
//   return childArray;
// }

function _scrollTriggerEnd(main, footer) {
  const ChildEls = iNode.getChildEls(main);
  const scrollTriggerEnd = sumELsHeight(footer, ...ChildEls);
  return scrollTriggerEnd;
}

function sumELsHeight(footer, ...els) {
  const h = els.reduce((sum, el) => sum + el.offsetHeight, 0);
  return h + footer.offsetHeight;
}

export { cling };