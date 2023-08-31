precision mediump float;

varying float v;

uniform sampler2D uTex;
uniform sampler2D uTex1;
varying vec2 vUv;

void main() {

    vec2 uvx = vec2(vUv.x, vUv.y * 1.0); 

    // vec4 tex = texture2D(uTex, vUv);
    vec4 tex = texture2D(uTex, uvx);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = tex;

//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
}