precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform float uTick;
uniform vec2 uNoise;

void main() {

  vec2 uv = vUv;
  //通常のノイズ
  // float n = noise2(vUv);
//時間が経つにつれてノイズが小さくなる
  // float n = noise2(vUv * uTick * 0.01);

//Y方向に移動
  float n = noise2(vec2(0.001 * vUv.y * uNoise.x, vUv.y - uTick * 0.005));

  //波のように揺れる
  // float n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y + uTick / 1.0), vUv.y * 100.0 + cos(vUv.x + uTick / 1.0)));

  vec4 texCurrent = texture2D(uTexCurrent, vUv + n);
  vec4 texNext = texture2D(uTexNext, vUv);

  gl_FragColor = texNext;
  // gl_FragColor = vec4(n, 0, 0, 1.0);
  gl_FragColor = mix(texCurrent, texNext, uProgress);
}
