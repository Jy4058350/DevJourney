vec2 zoomUv3(vec2 vUv, vec4 resolution, float uProgress, float uTick) {
    float time = abs(uProgress - 1.0) * 0.2;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(zoomUv3);