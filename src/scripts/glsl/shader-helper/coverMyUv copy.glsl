vec2 coverUv(vec2 uv, vec4 resolution) {
    float aspect = resolution.x / resolution.y;
    float imageAspect = resolution.z / resolution.w;
    if(imageAspect > aspect) {
        uv.x *= aspect / imageAspect;
        uv.x += (1. - aspect / imageAspect) / 2.;
    } else {
        uv.y *= imageAspect / aspect;
        uv.y += (1. - imageAspect / aspect) / 2.;
    }
    return uv;

    // return (uv - .5) * resolution.zw + .5;
}

#pragma glslify: export(coverUv);