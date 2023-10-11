precision mediump float;
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);
#pragma glslify: parabola = require(../shader-helper/parabola);

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

uniform float uTick;
varying vec2 vUv;
varying float progress;

void main() {

    //common
    vUv = uv;
    float progress = parabola(uProgress, 0.5);

    // add curlNoise
    vec3 p = position;
    vec3 ex = vec3(p.x + 0.1, p.y, p.z);
    vec3 curl = curlNoise(vec3(position.x * uTick * 0.1, position.y * uTick * 0.1, position.z * uTick * 0.1));
    p += ex * curl * progress;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 15.0 * (2000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}