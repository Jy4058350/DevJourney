precision mediump float;
#pragma glslify: spherenoise = require(glsl-noise/simplex/3d);
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

uniform float uTick;
varying vec2 vUv;
varying float vScalar;

void main() {

    // add curlNoise
    vec3 p = position;
    vec3 ex = vec3(p.x + 0.1, p.y, p.z);
    vec3 curl = curlNoise(vec3(position.x * uTick, position.y * uTick, position.z * uTick));
    p += ex * curl * uProgress;

    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}