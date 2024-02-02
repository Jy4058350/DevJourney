precision mediump float;

attribute float aDelay;
attribute vec3 sphere;

uniform float uProgress;

varying vec2 vUv;
varying float vDelay;

void main() {
    vUv = uv;
    vDelay = aDelay;

    float delay = clamp(uProgress * 3.0 - (1.0 - uv.x), 0.0, 1.0);
    vec3 pos = mix(position, sphere, delay);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // gl_PointSize = 7.0 * (1000.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
}