import { iNode } from "../../../iNode";

const cash = {
  init,
};

function init() {
  const els = iNode.qsa("[data-webgl]");
  console.log(els);


const cashes = [];

  els.forEach((el) => {
    const data = el.dataset;
    console.log(data);
    for(let key in data) {
        if(!key.startsWith("tex")) continue;
        key = key.replace("-", "");
        console.log(key);
        cashes.push(key);
    }
});
console.log(cashes);
}

export default cash;