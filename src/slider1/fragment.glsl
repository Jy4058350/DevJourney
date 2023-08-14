precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform sampler2D uTexDisp;
uniform float uProgress;
uniform float uTick;
uniform vec2 uNoise;
// float parabola(float x) {
//   return 1.0 - 4.0 * (x - 0.5) * (x - 0.5);
// }
float parabola(float x, float k) {
  return pow(4.0 * x * (1.0 - x), k);
}

void main() {

  vec2 uv = vUv;
  //通常のノイズ
  // float n = noise2(vUv);
//時間が経つにつれてノイズが小さくなる
  // float n = noise2(vUv * uTick * 0.01);

//Y方向に移動
  // float n = noise2(vec2(0.01 * vUv.x * uNoise.x, vUv.y));
  // n = n * 0.5 - 0.5;
  // n = n + uProgress;
  //波のように揺れる
  // float n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y + uTick / 1.0), vUv.y * 100.0 + cos(vUv.x + uTick / 1.0)));

  // n = step(0.0, n);
  vec4 texDisp = texture2D(uTexDisp, vUv);
  float disp = texDisp.r;
  disp = disp * parabola(uProgress, 1.0);
  vec4 texCurrent = texture2D(uTexCurrent, vUv + disp);
  vec4 texNext = texture2D(uTexNext, vUv + disp);

  // gl_FragColor = texNext;
  // gl_FragColor = vec4(n, 0, 0, 1.0);
  gl_FragColor = mix(texCurrent, texNext, uProgress);
  // gl_FragColor = texCurrent;
}
