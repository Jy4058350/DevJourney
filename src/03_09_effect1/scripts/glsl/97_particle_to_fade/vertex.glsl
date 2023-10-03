precision lowp float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)

#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

attribute vec3 sphere;

uniform float uProgress;

void main() {
    vUv = uv;
    vDelay = aDelay;
    // float delay = easeBack(clamp(uProgress * 3.0 - (1.0 - uv.x), 0.0, 1.0));
    // vec3 pos = mix(position, sphere, delay);    

    // gl_PointSize = 10.0 * delta;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 7.0 * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}