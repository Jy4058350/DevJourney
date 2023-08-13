precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;

void main() {

  vec2 uv = vUv;
  //通常のノイズ
  // float n = noise2(vUv);
//時間が経つにつれてノイズが小さくなる
  // float n = noise2(vUv * uTick * 0.01);

//X方向に移動
  // float n = noise2(vec2(vUv.x * 10.0 - uTick * 0.01, vUv.y * 1.0));


  //波のように揺れる
  float n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y + uTick / 1.0), vUv.y * 100.0 + cos(vUv.x + uTick / 1.0)));

  vec4 color = texture2D(uTex1, uv);

  gl_FragColor = vec4(n, 0, 0, 1);
}
