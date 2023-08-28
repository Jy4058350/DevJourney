precision mediump float;

varying vec2 vUv;

attribute vec3 position1;
attribute vec3 position2;
attribute vec3 color;
varying vec3 vPos;
varying vec3 vColor;


void main() {

vUv = uv;
vec3 vPos = position1;
vec3 vColor = color;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position2, 1.0);
}