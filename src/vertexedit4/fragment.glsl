precision mediump float;

varying float v;
varying float v1;

uniform sampler2D uTex;
uniform sampler2D uTex1;
varying vec2 vUv;
varying vec3 pos;

void main() {

    vec2 uv = vUv;
    vec3 p = pos * v;
    vec3 p1 = pos * v1;

    // vec4 tex = texture2D(uTex, vUv);
    vec4 tex = texture2D(uTex, uv);
    vec4 tex1 = texture2D(uTex1, uv);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = tex;

    //　ある範囲でdiscardする
    //😃test result　

    if(0.00< v1 && v1 < 0.29) {
    // if(0.17 < v1 && v1 < 0.26 && 0.35 < v1 && v1 < 0.42) {

        discard;
    }

    gl_FragColor = tex;
}
