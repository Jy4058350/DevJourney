precision mediump float;
#pragma glslify: noise = require(glsl-noise/simplex/3d);

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

    //add noise
    // float noise = noise(vec3(position.x * 0.1, position.y * 0.1, position.z * 0.1));
    float noise = snoise(vec3(sphereNormal.x, sphereNormal.y, sphereNormal.z - uTick * 0.001));
    // s = noise * 0.5 + 0.5;
    s += noise * 10.0;

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