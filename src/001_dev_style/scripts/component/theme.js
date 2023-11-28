import { iNode } from "../helper";

const theme = {
  init,
};

function init() {
  const els = iNode.qsa("[data-action");
  els.forEach((el) => {
    const data = el.dataset;
    console.log(data);
  });
}


export { theme };