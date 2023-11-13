vec2 coverUv(vec2 uv, vec4 resolution, float uTest) {
  return (uv - 0.5) * resolution.zw * uTest * 2.0 + 0.5;
}

#pragma glslify: export(coverUv)
