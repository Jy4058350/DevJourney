vec2 zoomUv(vec2 uv, vec4 resolution) {
    return (uv - .5) * resolution.zw * 0.8 + .5;
}

#pragma glslify: export(zoomUv);