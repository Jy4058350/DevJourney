varying vec2 vUv;
varying float vExpandTime;
attribute float aExpandTime;
uniform float uProgress;

void main() {
    vUv = uv;
    vExpandTime = aExpandTime;
    vec3 pos = position;

    float progress = clamp(uProgress * 1.3 - aExpandTime * 0.3, 0.0, 1.0);
    pos.z += progress * -10.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}