precision mediump float;

uniform sampler2D uTex1;
varying vec2 vUv;

void main() {



vec4 color = texture2D(uTex1, vUv);

gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
gl_FragColor = color;

}