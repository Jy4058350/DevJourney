import cash from "./cash";

const texesIs = {
  init,
};

export async function init(el) {
  const texes = new Map();
  const data = el.dataset;
  let compLoad = null;
  let first = true;

  for (let key in data) {
    if (!key.startsWith("tex")) continue;
    const url = data[key];
    const tex = cash.cashes.get(url);

    key = key.replace("-", "");
    texes.set(key, tex);

    if (el instanceof HTMLImageElement) {
      compLoad = new Promise((resolve) => {
        el.onload = () => {
          resolve();
        };
      });

      el.src = url;
      first = false;
    }
    await compLoad;
}
  return texes;
}

export { texesIs };
