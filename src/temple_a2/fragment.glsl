precision mediump float;

uniform sampler2D uTex;
// varying vec2 vUv;
uniform vec2 uMouse;
uniform float uHover;
varying vec3 vposition1;

void main() {

    // vec2 uv = vUv;

    // vec4 color = texture2D(uTex, uv);

    // gl_FragColor = color;
    // gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
    gl_FragColor = vec4(vposition1, 1.0);

}
