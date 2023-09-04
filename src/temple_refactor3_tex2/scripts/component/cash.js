import { iNode } from "../../../iNode";

const cash = {
  init,
};
const cashes = new Map();

function init() {
  const els = iNode.qsa("[data-webgl]");
  //   console.log(els);

  els.forEach((el) => {
    const data = el.dataset;
    console.log(data);
    for (let key in data) {
      if (!key.startsWith("tex")) continue;
      const url = data[key];
      key = key.replace("-", "");
      console.log(key);
      console.log(url);
      if (!cashes.has(key)) {
        cashes.set(key, url);
      }
    }
  });
  console.log(cashes);
}

export default cash;
