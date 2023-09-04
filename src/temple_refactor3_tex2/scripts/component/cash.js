import { iNode } from "../../../iNode";

const cash = {
  load,
  cashes,
};
const cashes = new Map();

function load() {
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
      if (!cashes.has(url)) {
        cashes.set(url, null);
      }
    }
  });
  console.log(cashes);
}

export default cash;
