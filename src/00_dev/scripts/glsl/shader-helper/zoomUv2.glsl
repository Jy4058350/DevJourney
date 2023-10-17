vec2 zoomUv2(vec2 vUv, vec4 resolution, float uProgress, float uTick) {
    float time = uProgress * 0.2;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(zoomUv2);