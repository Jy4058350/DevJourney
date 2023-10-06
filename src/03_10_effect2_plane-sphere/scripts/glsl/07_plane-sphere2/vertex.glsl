precision mediump float;
#pragma glslify: spherenoise = require(glsl-noise/simplex/3d);

attribute float aDelay;
attribute vec3 sphereNormal;
attribute vec3 sphere;

uniform float uProgress;

uniform float uSphereRadius;
uniform float uTick;
uniform float strength;
uniform float frequency;
varying vec2 vUv;
varying float vScalar;
varying vec3 vSphereNormal;

void main() {

    //add noise
    vec3 sphere = sphere;
    // float noise = spherenoise(vec3(sphereNormal.x, sphereNormal.y, sphereNormal.z - uTick * 0.001));
    float noise = spherenoise(vec3(sphereNormal.x - uTick * frequency, sphereNormal.y- uTick * frequency, sphereNormal.z- uTick * frequency));
    sphere += noise * strength;

    //calculate scalar
    vec3 p = position;
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