const utils = {
  lerp,
};

function lerp(start, end, amt) {
  let current = (1 - amt) * start + amt * end;
  if (Math.abs(end - current) < 0.0001) current = end;
  return current;
}

export { utils };
