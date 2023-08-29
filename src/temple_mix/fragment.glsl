precision mediump float;

varying vec2 vUv;

uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uTex4;

void main() {

  vec2 uv = vUv;
  vec2 uv2 = vec2(uv.x, 0.9 * uv.y);//uvのyを0.1倍にすると下がひきのばされる
  vec2 uv3 = vec2(uv.x);
  vec2 uv4 = vec2(uv.y);
  vec4 tex0 = texture2D(uTex0, uv2); //red

  vec4 tex1 = texture2D(uTex1, uv); //blue
  vec4 tex2 = texture2D(uTex2, uv2); //gray
  vec4 tex3 = texture2D(uTex3, uv2); //uv.jpg
  vec4 tex4 = texture2D(uTex4, uv2); //uv.jpg


  vec4 mixTex = mix(tex0, tex1, tex2.b); //上が青で下が赤のグラデーション
  vec4 mixTex1 = mix(tex0, tex1, 0.5); //第3匹引数に依存して赤か青の量が変わるのみでグラデーションには近づかない
  vec4 mixTex2 = mix(tex0, tex1, tex3); //赤とuv.jpgのグラデーション
  vec4 mixTex3 = mix(tex0, tex2, tex2); //赤とグレイのグラデーション
  vec4 mixTex4 = mix(tex0, tex4, tex2); //赤とグレイ2のグラデーション比較用

  vec4 color = vec4(0.5, uv4, 1.);

  vec2 mod = mod(uv, 0.8); 
  vec4 tex5 = texture2D(uTex1, mod); //mod


  gl_FragColor = color;
  gl_FragColor = tex5;
  gl_FragColor = tex4;
  gl_FragColor = mixTex4;

}