import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import { iNode } from "../../../iNode.js";

const scroll = {
  initScroll,
};

function initScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const pageConatainer = iNode.qs("#page-container");

  const scrollBar = Scrollbar.init(pageConatainer, { delegate: document });

  ScrollTrigger.scrollerProxy(pageConatainer, {
    //スクロール要素として設定しスクロール位置を監視するためのプロキシを作成
    scrollTop(value) {
      if (arguments.length) {
        scrollBar.scrollTop = value; //setter
      }
      return scrollBar.scrollTop; //getter
    },
  });
  scrollBar.addListener(ScrollTrigger.update); //スクロールイベントに対してアップデート関数をリスナーとして登録

  ScrollTrigger.defaults({ scroller: pageConatainer }); //デフォルトのスクロール要素を設定

  const el = iNode.qs("[data-webgl]");
}

export default scroll;
