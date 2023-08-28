precision mediump float;

attribute vec3 position1;
varying vec3 vposition1;

void main() {

  vec3 vposition1 = position1

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position1, 1.0);
}