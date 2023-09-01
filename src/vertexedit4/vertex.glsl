precision mediump float;

varying vec2 vUv;

attribute float normalizedValue;
attribute float normalizedValue1;
varying float v;
varying float v1;
varying vec3 pos;

varying vec4 vScale1;
varying vec4 vScale;

void main() {
    vUv = uv;
    v = normalizedValue * 0.5;
    v1 = normalizedValue1;
    pos = position;

    if(v1 < 1.0) {
        v1 = 1.0; //0.49以下を全て1にする。なので1以下をfragmentのdiscardで１以下で消す
    } else {
        v1 = 0.0;
    }

    vec4 scale = vec4(pos, 1.0);
    vec4 scale1 = vec4(pos, 2.0);
    vec4 scale2 = vec4(pos, 1.2);

    vScale1 = scale1;
    vScale = scale;

    gl_Position = projectionMatrix * modelViewMatrix * (scale1);
}
