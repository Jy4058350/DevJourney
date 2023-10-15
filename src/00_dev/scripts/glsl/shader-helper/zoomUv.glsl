vec2 zoomUv(vec2 vUv, vec4 resolution, float uProgress1) {
    float zoom = clamp(uProgress1 * 0.05, 0.0, 0.1);
    return (vUv - .5) * resolution.zw * (1.0 - zoom) + .5;
}

#pragma glslify: export(zoomUv);