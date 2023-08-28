precision mediump float;

uniform vec2 uMouse;
varying vec2 vcolor1;

void main() {

  gl_FragColor = vec4(vcolor1, 0.5, 1.0);

}