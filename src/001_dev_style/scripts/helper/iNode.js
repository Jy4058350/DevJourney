const iNode = {
  qs,
  qsa,
  getElById,
  styleSetProperty,
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

function styleSetProperty(elementId) {
  const headerHeight = this.getElById(elementId).offsetHeight;

  document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );
}

export { iNode };
