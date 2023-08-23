precision mediump float;
uniform sampler2D uTex;

varying vec2 vUv;


void main() {

  vec2 uv = vUv;

  vec4 color = texture2D(uTex, uv);

  gl_FragColor = color;

}