precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uMask;
uniform float uTick;
uniform float uProgress;

#pragma glslify: ease = require(glsl-easings/quartic-in)
// #pragma glslify: ease = require(glsl-easings/cubic-out)
// #pragma glslify: ease = require(glsl-easings/cubic-in-out)

varying float vDelay2;

void main() {
  vec2 uv = vUv;
  vec2 uv2 = -vUv;
  vec2 uv3 = -vUv;
  vec2 uv0 = vUv;

  float progress = ease(uProgress);

  // slideを上下に移動させる
  uv.y -= uTick * progress;
  uv3.y -= (uTick + 3.0) * uProgress;

  // セグメントの数　intは整数型であることを示す
  const int numSegments = 20;
  // セグメントの幅
  float segment = 1.0 / float(numSegments);

  // セグメントとアルファ値の計算
  int i;
  float alpha = 0.0;
  for(i = 0; i < numSegments; i++) {
    if(uProgress < float(i + 1) * segment) {
      alpha = 1.0 - (float(i) * segment);
      break;
    }
  }
  vec4 color0aa = texture2D(uTex1, uv0);
  vec4 color0 = texture2D(uTex1, uv0);
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv2);
  vec4 color3 = texture2D(uTex3, uv3);
  vec4 maskColor = texture2D(uMask, uv0);//マスクの色を取得
  vec4 color0a = vec4(color0.rgb * maskColor.r, 0.7);//アルファ値を調整して薄くしているグレーにする
  vec4 color1a = vec4(color1.rgb * maskColor.r, alpha); // アルファ値を設定

  vec4 colorz = vec4(color3.rgb, alpha);//グラデーションを３回すライドさせる

  // gl_FragColor = color1a;//color1を上にスライドかつ透明にする
  vec4 grad1 = mix(color1a, colorz, uProgress);//color1とグラデーションを混ぜる
  vec4 color1b = mix(color1a, color3, uProgress);

  gl_FragColor = mix(color0aa, color0a, uProgress);//colorをグレーにするにはuTickをつかっていないuvをとってこないといけない
  // gl_FragColor = mix(color1b, color2, uProgress);


}
