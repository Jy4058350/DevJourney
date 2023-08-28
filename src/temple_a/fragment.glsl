precision mediump float;

uniform vec2 uMouse;
varying vec3 vcolor1;


void main() {

 
  gl_FragColor = vec4(vcolor1, 1.0);
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);


}