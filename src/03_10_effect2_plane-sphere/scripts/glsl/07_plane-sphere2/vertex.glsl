precision mediump float;

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

varying vec2 vUv;

void main() {
    vUv = uv;

    float distancFromCenter = distance(uv, vec2(0.5, 0.5));

    float progress = uProgress * 2.0 - distancFromCenter;

    progress = clamp(progress, 0.0, 1.0);

    vec3 pos = mix(sphere * 0.5, position, progress);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}