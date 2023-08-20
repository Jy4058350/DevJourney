precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;

//slideを上下に移動させる
  uv.y += uTick * uProgress;

  vec4 color1 = texture2D(uTex1, uv);

  color1.a = 1.0 - uProgress;

  gl_FragColor = color1;
}
