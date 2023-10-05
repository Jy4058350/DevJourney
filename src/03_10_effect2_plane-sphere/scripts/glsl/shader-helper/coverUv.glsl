vec2 coverUv(vec2 uv, vec4 resolution) {
    return (uv - .5) * resolution.zw + .5;
}

#pragma glslify: export(coverUv);