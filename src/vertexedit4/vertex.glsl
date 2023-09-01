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

    if (0.31 < v && v < 0.38) {
        v = 0.0;
    } else {
        v = 1.0;
    }
    
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.2);
}
