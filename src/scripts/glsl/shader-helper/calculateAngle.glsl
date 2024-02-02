float calculateAngle(vec2 uv, float uProgress) {
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float angle = degrees(atan(delta.x, delta.y));
    float a = uProgress * 90.0;
    float a1 = uProgress * 180.0;
    float a2 = uProgress * 270.0;
    float a3 = uProgress * 360.0;
    angle = mod(angle, 360.0);
    return angle;
}

#pragma glslify:export(calculateAngle);