vec2 coverUv(vec2 uv, vec4 resolution, float uTest) {

  

  float rectWidth = resolution.x;
  float rectHeight = resolution.y;

  float aspectRatio = rectWidth / rectHeight;

  float uvAspectRatio = uv.x / uv.y;

  if(aspectRatio > uvAspectRatio) {
    uv.y = uv.y * aspectRatio / uvAspectRatio;
    uv.y = uv.y / aspectRatio * uvAspectRatio;
  } else {
    uv.x = uv.x * uvAspectRatio / aspectRatio;
    uv.x = uv.x / uvAspectRatio * aspectRatio;
  }

  // return uv;
  resolution.z *= uTest;
  resolution.w *= uTest;
  return (uv - 0.5) * resolution.zw + 0.5;
}

#pragma glslify: export(coverUv)
