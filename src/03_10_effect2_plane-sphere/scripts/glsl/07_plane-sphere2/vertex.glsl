precision mediump float;
#pragma glslify: spherenoise = require(glsl-noise/simplex/3d);

attribute float aDelay;
attribute vec3 sphereNormal;
attribute vec3 sphere;

uniform float uProgress;

uniform float uSphereRadius;
uniform float uTick;
varying vec2 vUv;
varying float vScalar;
varying vec3 vSphereNormal;


void main() {

    vec3 p = position;
    //add noise
    vec3 sphere = sphere;
    float noise = spherenoise(vec3(sphereNormal.x, sphereNormal.y, sphereNormal.z - uTick * 0.001));
    // s = noise * 0.5 + 0.5;
    sphere += noise * 10.0;

    vUv = uv;
    vSphereNormal = sphereNormal;

    float distanceFromCenter = distance(uv, vec2(0.5, 0.5));

    float scalar = uProgress * 2.0 - distanceFromCenter;

    scalar = clamp(scalar, 0.0, 1.0);

    vScalar = scalar;

    vec3 pos = mix(sphere * uSphereRadius, position, scalar);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}