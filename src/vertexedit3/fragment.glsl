precision mediump float;

varying float vNormalizedValue;

uniform sampler2D uTex;
uniform sampler2D uTex1;
varying vec2 vUv;

void main() {

    float v = vNormalizedValue - 0.5;

    vec4 tex = texture2D(uTex, vUv);

    gl_FragColor = tex;

    gl_FragColor = vec4(1.0 * v, 0.0, 0.0, 1.0);
}

//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
//   }