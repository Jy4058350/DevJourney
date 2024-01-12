const iNode = {
  qs,
  qsa,
  getElById,
  getElement,
  getDateSet,
  setCssProp,
  setStyles,
  setHeightPx,
  toggleClass,
  getElementHeight,
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

function getDateSet(target, key) {
  const el = this.getElement(target);
  return el?.dataset?.[key] ?? null;
}

function setCssProp(property, value, element) {
  if (!element) {
    // document.documentElement.style.setProperty(property, `${value}px`);
    throw new Error("Element is required.");
  } else {
    element.style.setProperty(property, `${value}px`);
  }
}

function setStyles(element, styles) {
  Object.assign(element.style, styles);
}

function setHeightPx(element, height) {
  element.style.height = `${height}px`;
}

function toggleClass(element, className, condition) {
  element.classList.toggle(className, condition);
}

function getElementHeight(el, errormsg) {
  if (!el) {
    throw new Error(errormsg);
  }
  return el.offsetHeight;
}

export { iNode };
