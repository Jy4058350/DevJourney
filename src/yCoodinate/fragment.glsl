precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;

//テクスチャのy座標をuProgressの値に応じて変化させる
  // vec2 yCoodinate = (1 - uProgress) * uv;
  vec2 yCoodinate = vec2(uv.x, (1.0 - uProgress) * uv.y);

  // vec4 color = texture2D(uTex1, uv);
  //変更したy座標をつかってテクスチャを取得
  vec4 yCoodinateColor = texture2D(uTex1, yCoodinate);
  // gl_FragColor = color;
  gl_FragColor = yCoodinateColor;

}