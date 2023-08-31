precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;
varying float vNormalizedValue;

void main() {
    vUv = uv;
    vNormalizedValue = normalizedValue;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
