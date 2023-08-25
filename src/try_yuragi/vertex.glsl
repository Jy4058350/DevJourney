precision mediump float;

uniform float uProgress;
varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

void main() {
    vUv = uv;
    vDelay = aDelay;
    vec3 pos = position;
    // float progress =uProgress;
    float progress = clamp(uProgress * 1.3 - aDelay * 0.3, 0.0, 1.0);
    // float progress = sin(uProgress*1.3 - aDelay * 0.3);
    pos.z = sin(progress * 6.28 * 9.0) * 20.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}