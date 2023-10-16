vec2 zoomUv(vec2 vUv, vec4 resolution, float uProgress, float uTick) {
    float time = sin(3.0 * uProgress) * 0.2;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(zoomUv);