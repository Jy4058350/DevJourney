const iNode = {
  qs,
  qsa,
  getElById,
  setCssProp,
};

function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  const qsa = (scope || document).querySelectorAll(selector);
  return Array.from(qsa);
}

function getElById(selector, scope) {
  return (scope || document).getElementById(selector);
}

// function setCssProp(value) {
function setCssProp(property, value) {
  // document.documentElement.style.setProperty("--header-height", `${value}px`);
  document.documentElement.style.setProperty(property, `${value}px`);
}

export { iNode };
