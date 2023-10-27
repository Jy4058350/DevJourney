varying vec2 vUv;

uniform float uRadius;
uniform float uSlideIndex;
uniform float uSlideTotal;
uniform float uActiveIndex;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}