precision mediump float;

uniform sampler2D uTex;

void main() {

    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 1.0, 0.0, 1.0);



    gl_FragColor = color1;
}


//    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.7) {
//     discard;
//   }