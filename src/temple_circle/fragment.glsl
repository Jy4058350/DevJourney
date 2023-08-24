precision mediump float;

varying vec2 vUv;
uniform float uProgress;

void main() {

  float v = uProgress * 3.0;
  vec2 uv = vUv;

  //円の中心からグラデーションをかける　lengthとdistanceの２パターン
  // float circle = length(vUv - vec2(0.5, 0.5)) * v;
  // float circle = distance(uv, vec2(0.0, 0.0));

//下からグラデーションをかけるパターン
  float ubot = uv.y;

//上からグラデーションをかけるパターン
  // float tbot = 1.0 - uv.y;
  float tbot = abs(uv.y - 1.0);

//左からグラデーションをかけるパターン
float gleft = uv.x;


//グラデーションを動かす
float bgrade = uv.x + uProgress;


  gl_FragColor = vec4(bgrade, 0.0, 0.5, 1.0);
}