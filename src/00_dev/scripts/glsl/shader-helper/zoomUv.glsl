vec2 zoomUv(vec2 uv, vec4 resolution, float uProgress) {
    float zoom = clamp(uProgress * 0.05, 0.0, 0.2);
    return (uv - .5) * resolution.zw * (1.0 - zoom) + .5;
}

#pragma glslify: export(zoomUv);