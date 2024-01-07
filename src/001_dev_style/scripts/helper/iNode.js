const iNode = {
  qs,
  qsa,
  getElById,
  getElement,
  setCssProp,
  setStyles,
  toggleClass,
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

function isElement(target) {
  return target instanceof Element || target instanceof Document;
}

function getElement(elementOrSelector) {
  return isElement(elementOrSelector)
    ? elementOrSelector
    : this.qs(elementOrSelector);
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

function toggleClass(element, className, condition) {
  element.classList.toggle(className, condition);
}

export { iNode };
