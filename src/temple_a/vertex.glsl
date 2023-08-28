precision mediump float;

attribute vec3 position1;
attribute vec3 color1;
varying vec3 vcolor1;

void main() {

    vec3 vcolor1 = color1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position1, 1.0);
}