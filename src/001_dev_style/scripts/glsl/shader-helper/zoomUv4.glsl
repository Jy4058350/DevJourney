vec2 zoomUv(vec2 vUv, vec4 resolution, float uProgress, float uTick, float uRaito) {

    float rectWidth = resolution.x;
    float rectHeight = resolution.y;

    float aspectRatio = rectWidth / rectHeight;

    float uvAspectRatio = vUv.x / vUv.y;

    if(aspectRatio > uvAspectRatio) {
        vUv.y = vUv.y * aspectRatio / uvAspectRatio;
        vUv.y = vUv.y / aspectRatio * uvAspectRatio;
    } else {
        vUv.x = vUv.x * uvAspectRatio / aspectRatio;
        vUv.x = vUv.x / uvAspectRatio * aspectRatio;
    }

    float time = uProgress * uRaito;
    // float time = uTick * 0.001;
    return (vUv - .5) * resolution.zw * (1.0 - time) + .5;
}

#pragma glslify: export(zoomUv);