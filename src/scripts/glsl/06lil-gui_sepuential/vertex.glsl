precision lowp float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)

#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
attribute float aIntensity;

uniform float uProgress;
varying float vAlpha;

varying float vProgress;

void main() {
    vUv = uv;
    vec3 pos = position;

    float progress = vProgress = 1.0 - abs(2.0 * uProgress - 1.0);
    float speed = easeCubic(progress);
    vec2 xyDirection = (uv - 0.5) * 2.0;
    float constXY = 1000.0;
    pos.z = speed * aIntensity;

    pos.xy += xyDirection * constXY * pos.z / 1000.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 10.0 * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = mix(0.1, 1.5, -mvPosition.z / 1000.0);

}