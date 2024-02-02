float distanceFromCenter(vec2 vUv, vec4 uResolution) {

    float rectWidth = uResolution.x;
    float rectHeight = uResolution.y;

    float aspectRatio = rectWidth / rectHeight;

    float uvAspectRatio = vUv.x / vUv.y;

    if(aspectRatio > uvAspectRatio) {
        vUv.y = vUv.y * aspectRatio / uvAspectRatio;
        vUv.y = vUv.y / aspectRatio * uvAspectRatio;
    } else {
        vUv.x = vUv.x * uvAspectRatio / aspectRatio;
        vUv.x = vUv.x / uvAspectRatio * aspectRatio;
    }

    vec2 centerdUv = vUv - vec2(0.5, 0.5);
    // float aspectRatio = uResolution.x / uResolution.y;
    centerdUv.x *= aspectRatio;
    return length(centerdUv);
}

#pragma glslify: export(distanceFromCenter);