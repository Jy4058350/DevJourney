// precision mediump float;

// varying vec2 vUv;
// uniform vec4 uResolution;

// uniform sampler2D tex1;

// vec2 coverUv(vec2 vUv, vec4 resolution) {
//   return (vUv - .5) * resolution.zw + .5;
// }

precision mediump float;

varying vec2 vUv;
uniform vec4 uResolution;

uniform sampler2D tex1;

void main() {
  // 画面中心を中心とした座標系に変換
  vec2 centeredUv = vUv - vec2(0.5, 0.5);

  // テクスチャのアスペクト比を考慮
  float aspectRatio = uResolution.x / uResolution.y;
  centeredUv.x *= aspectRatio;

  // 中心からの距離を計算
  float distanceFromCenter = length(centeredUv);

  // 真円の半径を設定
  float radius = 0.3;

  // 半径内の場合、テクスチャ色を設定
  if (distanceFromCenter < radius) {
    gl_FragColor = texture2D(tex1, centeredUv / aspectRatio + vec2(0.5, 0.5));
  } else {
    // 半径外の場合、透明色を設定
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
