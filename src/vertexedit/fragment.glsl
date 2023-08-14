precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);

  gl_FragColor = mix(color1, color2, uProgress);

}