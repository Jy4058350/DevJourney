precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;
attribute float normalizedValue1;
varying float v;
varying float v1;
varying vec3 pos;

void main() {
    vUv = uv;
    v = normalizedValue;
    v1 = normalizedValue1;
    pos = position;

    if(v < 0.43) {
        v = 0.0;
    } else {
        v = 1.0;
    }

    if(v1 < 0.43) {
        v1 = 1.0;
    } else {
        v1 = 0.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position*v1, 0.7);
}
