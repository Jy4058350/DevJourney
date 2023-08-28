precision mediump float;

attribute vec3 vertices;

void main() {

   

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}