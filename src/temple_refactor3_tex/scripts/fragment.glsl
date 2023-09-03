precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;

void main() {

vec2 uv = vUv;
vec4 texColor = texture2D(uTex1, uv);
gl_FragColor = texColor;

}