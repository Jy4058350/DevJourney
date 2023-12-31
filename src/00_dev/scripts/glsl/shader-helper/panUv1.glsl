vec2 panUv1(vec2 vUv, vec4 resolution, float uProgress, float uTick, float xOffset, float yOffset, float uRaito) {
    float time = uProgress * uRaito;
    vUv.x -= xOffset * (1.0 - uProgress) * 3.0;
    vUv.y += yOffset * (1.0 - uProgress) * 3.0;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(panUv1);