import cash from "./cash";

const texesIs = {
  init,
};

export async function init(el) {
  const texes = new Map();
  const data = el.dataset;
  // console.log(el);

  let compLoad = null;
  let first = true;

  for (let key in data) {
    if (!key.startsWith("tex")) continue;
    const url = data[key];
    const tex = cash.cashes.get(url);

    key = key.replace("-", "");
    texes.set(key, tex);

    if (first && el instanceof HTMLImageElement) {
      compLoad = new Promise((resolve) => {
        el.onload = () => { //非同期処理のイベントハンドラー
          resolve();
        };
      });

      el.src = url;
      first = false;
    }
    if (first && el instanceof HTMLVideoElement) {
      compLoad = new Promise((resolve) => {
        el.onloadeddata = () => {
          resolve();
        };
      });

      el.src = url;
      el.load();
      first = false;
    }
  }
  await compLoad;
  return texes;
}

export { texesIs };
