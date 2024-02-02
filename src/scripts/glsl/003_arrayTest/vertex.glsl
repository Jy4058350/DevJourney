// attribute vec2 uv; // The UV coordinates for the vertex
// attribute vec3 position; // The position of the vertex
// uniform mat4 projectionMatrix; // The projection matrix
// uniform mat4 modelViewMatrix; // The model-view matrix

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}