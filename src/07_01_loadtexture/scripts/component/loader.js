import { TextureLoader } from "three";
import { iNode } from "../helper";

const loader = {
  init,
};

const texLoader = new TextureLoader();

const texBox = new Map();

function init() {
  const els = iNode.qsa("[data-webgl]");
  els.forEach((el) => {
    const data = el.dataset;
    for(let key in data) {
        if(key.startsWith("tex")) {
            console.log(key);

        }
    }

    console.log(data);
  });
}

export { loader };
