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
uniform float noiseScale;
varying vec2 vUv;
varying float vScalar;
varying vec3 vSphereNormal;

void main() {

    //add noise
    vec3 sphere = sphere;
    float noise = spherenoise(vec3((sphereNormal.x) * noiseScale - uTick * frequency, (sphereNormal.y)* noiseScale - uTick * frequency , (sphereNormal.z)* noiseScale - uTick * frequency ));
    sphere += sphere * noise * strength;

    //calculate scalar
    vec3 p = position;
    vUv = uv;
    vSphereNormal = sphereNormal + sphereNormal * noise * 0.3;

    float distanceFromCenter = distance(uv, vec2(0.5, 0.5));

    float scalar = uProgress * 2.0 - distanceFromCenter;

    scalar = clamp(scalar, 0.0, 1.0);

    vScalar = scalar;

    vec3 pos = mix(sphere * uSphereRadius, position, scalar);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}