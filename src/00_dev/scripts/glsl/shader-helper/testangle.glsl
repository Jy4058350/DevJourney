// float testangle(vec2 uv, float uProgress, float startAngle, float endAngle, vec4 c1, vec4 c2) {
float testangle(vec2 uv, float uProgress, float startAngle, float endAngle) {
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float testangle = degrees(atan(delta.y, delta.x));

    return testangle;
}

#pragma glslify: export(testangle);