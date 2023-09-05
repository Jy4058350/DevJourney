import cash from "./cash";

const texesIs = {
  init,
};

export function init(el) {
  const texes = new Map();
  const data = el.dataset;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;
    const url = data[key];
    const tex = cash.cashes.get(url);

    key = key.replace("-", "");
    texes.set(key, tex);

    if (el instanceof HTMLImageElement) {
      new Promise((resolve) => {
        el.onload = () => {
          resolve();
        };
      });

      el.src = url;
    }
  }
  return texes;
}

export { texesIs };
