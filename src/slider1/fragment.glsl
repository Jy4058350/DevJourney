precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform vec2 uNoise;

void main() {

  vec2 uv = vUv;
  //通常のノイズ
  // float n = noise2(vUv);
//時間が経つにつれてノイズが小さくなる
  // float n = noise2(vUv * uTick * 0.01);

//Y方向に移動
  float n = noise2(vec2(vUv.y * uNoise.x, vUv.y - uTick * 0.03));

  //波のように揺れる
  // float n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y + uTick / 1.0), vUv.y * 100.0 + cos(vUv.x + uTick / 1.0)));

  vec4 tex = texture2D(uTex1, vUv + n);

  gl_FragColor = tex;
  // gl_FragColor = vec4(n, 0, 0, 1.0);
}
