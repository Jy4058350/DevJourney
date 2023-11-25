const iNode = {
  qs,
  qsa,
  getElById,
  setCssProp,
  setStyles
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

function setCssProp(property, value, element) {
  if (!element) {
    document.documentElement.style.setProperty(property, `${value}px`);
  } else {
    element.style.setProperty(property, `${value}px`);
  }
}

function setStyles(element, styles) {
  Object.assign(element.style, styles);
}

export { iNode };
