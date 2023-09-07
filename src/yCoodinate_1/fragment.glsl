precision mediump float;

uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;

uniform float uTick;
uniform float uProgress;

varying vec2 vUv;
void main() {

  vec2 uv = vUv;

  vec4 tex1 = texture(uTex1, uv);
  float tex1a = tex1.a * clamp(uProgress, 0.2, 1.0);
  vec4 tex1aa = vec4(tex1.rgb, tex1a);

  vec4 tex2 = texture(uTex2, uv);
  float tex2a = tex2.a * (1.0 - clamp(uProgress, 0.0, 0.6));
  vec4 tex2aa = vec4(tex2.rgb, tex2a);

  vec4 tex3 = texture(uTex3, uv);//graytoon
  tex3.a *= 0.5;//透明度の設定

  vec4 tex4 = mix(tex1aa, tex2aa, smoothstep(uProgress - 0.3, uProgress + 0.3, uv.y));

  gl_FragColor = tex4;
  // gl_FragColor = tex1;
  // gl_FragColor = tex2aa;
  // gl_FragColor = tex1aa;
}