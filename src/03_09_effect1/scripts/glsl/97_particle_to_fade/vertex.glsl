precision lowp float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)

#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

attribute vec3 sphere;

uniform float uProgress;

varying float vProgress;

void main() {
    vUv = uv;
    vDelay = aDelay;
    vec3 pos = position;

    float progress = vProgress = 1.0 - abs(2.0 * uProgress - 1.0);
    // float vProgress = progress;
    pos.z += progress * 500.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 9.0 * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}