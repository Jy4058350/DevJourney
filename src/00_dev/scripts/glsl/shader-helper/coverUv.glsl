vec2 coverUv(vec2 uv, vec4 uResolution) {
    float aspect = uResolution.x / uResolution.y;
    vec2 scale = vec2(1.0);
    if(aspect > 1.0) {
        scale.x = 1.0 / aspect;
    } else {
        scale.y = aspect;
    }
    uv *= scale;

    return (uv - .5) * uResolution.zw + .5;
}

#pragma glslify: export(coverUv);