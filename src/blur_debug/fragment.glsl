precision mediump float;

uniform vec2 uMouse;
uniform float uHover;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;

const int kernelSize = 9;  // カーネルサイズ（奇数の値を選ぶ）

// ガウスぼかしのカーネル
const float kernel[kernelSize] = float[](0.05, 0.09, 0.12, 0.15, 0.16, 0.15, 0.12, 0.09, 0.05);

void main() {
  vec2 uv = vUv;
  vec4 color = texture2D(uTex1, uv);

  vec3 blurredColor = vec3(0.0);

  // ガウスぼかしの計算
  for(int i = 0; i < kernelSize; i++) {
    for(int j = 0; j < kernelSize; j++) {
      vec2 offset = vec2(float(i - kernelSize / 2), float(j - kernelSize / 2)) * 0.003;  // ぼかしの強さを調整
      blurredColor += texture2D(uTex1, uv + offset).rgb * kernel[i] * kernel[j];
    }
  }

  gl_FragColor = vec4(blurredColor, 1.0);
  gl_FragColor = color;
  gl_FragColor = vec4(1.0, 0.0, 0.0, 0.3);

  vec2 mouse = step(uMouse, vUv);
  gl_FragColor = vec4(mouse, uHover, 1.);
}
