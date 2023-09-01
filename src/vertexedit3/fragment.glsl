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

//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
}