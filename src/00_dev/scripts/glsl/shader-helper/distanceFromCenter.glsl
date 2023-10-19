float distanceFromCenter(vec2 vUv, vec4 uResolution) {
    vec2 centerdUv = vUv - vec2(0.5, 0.5);
    float aspectRatio = uResolution.x / uResolution.y;
    centerdUv.x *= aspectRatio;
    return length(centerdUv);
}

#pragma glslify: export(distanceFromCenter);