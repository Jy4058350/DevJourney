precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;
  //uTickをデフォルトは0.0では動かないので1.0を足している
  // float time = uTick + 1.0;

//slideを右から左に移動させる　 uTickはスピード調整用で20にしたら挙動がはやくなる
  uv.y += uTick * uProgress;
  // uv.x += time * uProgress;

  vec4 color1 = texture2D(uTex1, uv);

  gl_FragColor = color1;
}
