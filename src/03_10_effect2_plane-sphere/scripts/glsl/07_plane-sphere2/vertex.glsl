precision mediump float;

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

varying vec2 vUv;

void main() {
    vUv = uv;

    float try = distance(uv, vec2(0.5, 0.5));
    vec3 pos = mix(position, sphere, uProgress);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}