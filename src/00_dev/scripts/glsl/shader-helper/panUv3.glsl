vec2 panUv3(vec2 vUv, vec4 resolution, float uProgress, float uTick, float xOffset, float yOffset) {
    // float time = sin(3.0 * uProgress) * 0.2;
    float time = uProgress * 0.2;
    vUv.x -= xOffset * (1.0 - uProgress) * 3.0;
    vUv.y -= yOffset * (1.0 - uProgress) * 3.0;
    // vUv.x += xOffset * cos(uProgress * 3.0 - (3.14 / 2.0));
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(panUv3);