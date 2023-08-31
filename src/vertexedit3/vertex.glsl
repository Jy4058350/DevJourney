precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;
attribute float normalizedValue1;
varying float v;
varying float v1;

void main() {
    vUv = uv;
    v = normalizedValue;
    v1 = normalizedValue1;

    if(v < 0.23) {
        v = 0.0;
    } else {
        v = 1.0;
    }

     if(v1 < 0.56) {
        v1 = 1.0;
    } else {
        v1 = 0.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * v1, 0.7);
}
