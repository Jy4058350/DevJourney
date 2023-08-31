precision mediump float;

varying float vNormalizedValue;

uniform sampler2D uTex;
uniform sampler2D uTex1;
varying vec2 vUv;

void main() {

    float v = vNormalizedValue;

    if(v < 0.5) {
        v = 0.0;
    } else {
        v = 1.0;
    }
  



    vec4 tex = texture2D(uTex, vUv);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = tex * v;



//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
  }