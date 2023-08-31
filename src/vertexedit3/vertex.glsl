precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;
varying float v;

void main() {
    vUv = uv;
    v = normalizedValue;

    if( v < 0.23 ) {
        v = 0.0;
    } else {
        v = 1.0;
    }


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position*v, 1.0);
}
