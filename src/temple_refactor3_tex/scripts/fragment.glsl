precision mediump float;

varying vec2 vUv;
uniform sampler2D tex1;
uniform sampler2D tex2;

void main() {

vec2 uv = vUv;
vec4 texColor = texture2D(tex1, uv);
gl_FragColor = texColor;

}