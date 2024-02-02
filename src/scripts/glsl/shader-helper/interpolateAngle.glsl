vec4 interpolateAngle(vec2 uv, float uProgress, float startAngle, float endAngle, vec4 c1, vec4 c2) {
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float angle = degrees(atan(delta.y, delta.x));

    float interpolateAngle = mix(startAngle, endAngle, (1.0 - uProgress));
    // return interpolateAngle, angle;
    vec4 g = (angle >= interpolateAngle && angle <= endAngle) ? c1 : c2;
    return g;
}

#pragma glslify: export(interpolateAngle);