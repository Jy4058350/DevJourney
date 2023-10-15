vec2 zoomUv(vec2 vUv, vec4 resolution, float uProgress1, float uTick) {
    if(uProgress1 < 1.0) {
        float time = uProgress1 * uTick * 0.0001;
        float zoom = clamp(time, 0.0, 0.2);
        return (vUv - .5) * resolution.zw * (1.0 - zoom) + .5;

    }

    // float zoom = clamp(uProgress1 * 0.05, 0.0, 0.2);
}

#pragma glslify: export(zoomUv);