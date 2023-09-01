precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;//正規化された値

varying float v;
varying float v1;
varying vec3 pos;

void main() {
    vUv = uv;
    v = normalizedValue;
    pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.2);
}
