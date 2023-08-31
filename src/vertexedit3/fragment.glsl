precision mediump float;

uniform sampler2D uTex1;
varying vec2 vUv;

void main() {

    // vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 tex = texture2D(uTex1, vUv);


    gl_FragColor = tex;
}


//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
//   }