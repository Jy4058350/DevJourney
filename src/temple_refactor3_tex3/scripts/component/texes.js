import cash from "./cash";

const init = {
  texesIs,
};

export function texesIs(el) {
  const texes = new Map();
  const data = el.dataset;
  for (let key in data) {
    if (!key.startsWith("tex")) continue;
    const url = data[key];
    const tex = cash.cashes.get(url);

    key = key.replace("-", "");
    texes.set(key, tex);
  }
  return texes;
}

export { init };
