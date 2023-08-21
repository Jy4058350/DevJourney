precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform float uTick;
uniform float uProgress;

void main() {
  vec2 uv = vUv;
  vec2 uv2 = -vUv;

  // slideを上下に移動させる
  uv.y -= uTick * uProgress;

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

  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv2);
  vec4 color3 = texture2D(uTex3, uv2);
  vec4 color1a = vec4(color1.rgb, alpha); // アルファ値を設定
  gl_FragColor = mix(color1a, color2, uProgress);
}
