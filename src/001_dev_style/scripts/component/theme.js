import { iNode } from "../helper";

const theme = {
  init,
};

function init() {
  const els = iNode.qsa("[data-action");
  const cartCountEl = iNode.qs(".Header__CartCount");
  els.forEach((el) => {
    const data = el.dataset;
    // console.log(data);
    for (let key in data) {
      if (!key.startsWith("drawer")) continue;
      if (key.startsWith("drawer")) {
        const action = data[key];
        // console.log(action);

        if (cartCountEl) {
          cartCountEl.insertAdjacentHTML("beforebegin", "cart(");
          cartCountEl.insertAdjacentHTML("afterend", ")");
        }
      }
    }
  });
}

export { theme };
