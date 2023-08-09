precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex3;
uniform sampler2D uTex4;
uniform float uTick;
uniform float uProgress2;

void main() {

  vec2 uv = vUv;

  vec4 color1 = texture2D(uTex3, uv);
  vec4 color2 = texture2D(uTex4, uv);

  vec4 color = mix(color1, color2, uProgress2);
  gl_FragColor = color;

}