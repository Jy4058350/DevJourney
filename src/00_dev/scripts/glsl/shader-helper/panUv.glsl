vec2 panUv(vec2 vUv, vec4 resolution, float uProgress, float uTick, float xOffset, float yOffset) {
    float time = sin(3.0 * uProgress) * 0.2;
    vUv.x += xOffset * sin(uProgress * 3.0);
    vUv.y += yOffset * cos(uProgress * 3.0 - (PI / 2.0));
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(panUv);