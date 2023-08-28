precision mediump float;

uniform sampler2D uTex;
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uHover;

void main() {

    vec2 uv = vUv;

    // vec4 color = texture2D(uTex, uv);

    // gl_FragColor = color;
    gl_FragColor = vec4(uv, 0.5, 1.0);

}