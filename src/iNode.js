const iNode = {
  qs,
  qsa,
};

function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

export { iNode };
