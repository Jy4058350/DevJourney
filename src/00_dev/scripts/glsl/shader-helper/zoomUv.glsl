vec2 zoomUv(vec2 uv, vec4 resolution, float uProgress) {
    // return (uv - .5) * resolution.zw * 0.8 + .5;

    // float progress = (1.0 - uProgress);
    float zoom = clamp(uProgress, 0.0, 0.2);
    return (uv - .5) * resolution.zw * (1.0 - zoom) + .5;
}

#pragma glslify: export(zoomUv);