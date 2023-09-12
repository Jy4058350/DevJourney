export async function loadTex(url) {
  const texLoader = new THREE.TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  return texture;
}

export function lerp(a, b, n) {
  let current = (1 - n) * a + n * b;
  if (Math.abs(b - current) < 0.001) current = b;
  return current;
}


