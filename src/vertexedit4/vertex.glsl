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

    
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.2);
}
