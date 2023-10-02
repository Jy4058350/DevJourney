precision mediump float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)

#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

attribute vec3 sphere;

uniform float uProgress;
uniform float uTick;
uniform float uScaleDelay;
uniform float uScaleTime;

void main() {
    vUv = uv;
    vDelay = aDelay;
    float delay = easeBack(clamp(uProgress * 3.0 - (1.0 - uv.x), 0.0, 1.0));
    vec3 pos = mix(position, sphere, delay);    

    // gl_PointSize = 10.0 * delta;
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}