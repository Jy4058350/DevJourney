precision mediump float;
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);
#pragma glslify: parabola = require(../shader-helper/parabola);

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

uniform float uTick;
uniform float uSpeed;
uniform float uSparkle;
uniform float uSize;
uniform vec3 uPan;
uniform vec3 uNoise;
varying vec2 vUv;
varying float progress;
varying float vProgress;

void main() {

    //common
    vUv = uv;
    float progress = parabola(uProgress, 0.5);
    float time = uTick * uSpeed;
    float sparkle = uSparkle;

    // add curlNoise
    vec3 p = position;
    // vec3 ex = vec3(p.x + sparkle, p.y + sparkle, p.z + sparkle);
    vec3 ex = vec3(p.x * uPan.x, p.y * uPan.y, 1.0);
    vec3 curl = curlNoise(vec3(p.x * time * uNoise.x, p.y * time * uNoise.y, p.z * time * uNoise.z));
    p += ex * curl * progress;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}