// float testangle(vec2 uv, float uProgress, float startAngle, float endAngle, vec4 c1, vec4 c2) {
vec4 testangle(vec2 uv, float uProgress, vec4 tex1, vec4 tex2) {

    float startAngle = -180.0;
    float endAngle = 180.0;
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    vec4 tex1a = texture2D(tex1, uv);
    vec4 tex2a = texture2D(tex2, uv);
    float angle = degrees(atan(delta.y, delta.x));
    float iangle = mix(startAngle, endAngle, (1.0 - uProgress));
    vec4 testangle = (angle >= iangle && angle <= endAngle) ? tex1a : tex2a;
    return testangle;
}

#pragma glslify: export(testangle);