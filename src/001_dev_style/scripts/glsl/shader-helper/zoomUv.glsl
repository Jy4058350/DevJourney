vec2 zoomUv(vec2 vUv, vec4 resolution, float uProgress1, float uTick, float uRaito) {
    float time = uProgress1 * uRaito;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(zoomUv);