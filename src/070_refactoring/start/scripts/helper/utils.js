// 線形補間
function lerp(a, b, n) {
  let current = (1 - n) * a + n * b;
  if (Math.abs(b - current) < 0.001) current = b;
  return current;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

export { lerp, getWorldPosition };
