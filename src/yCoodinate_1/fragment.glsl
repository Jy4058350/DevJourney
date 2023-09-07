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
  vec4 tex2 = texture(uTex2, uv);

  float gray = (tex1.r + tex1.g + tex1.b) / 3.0;
  float tex1a1 = tex1.a * (1.0 - clamp(uProgress, 0.0, 0.4));
  vec4 tex1g = vec4(gray, gray, gray, tex1a1);
  vec4 tex1ga = mix(tex1g, tex1, uProgress);

  float tex2a1 = tex2.a * (1.0 - clamp(uProgress, 0.0, 0.5));
  float gray2 = (tex2.r + tex2.g + tex2.b) / 3.0;
  vec4 tex2g = vec4(gray2, gray2, gray2, tex2a1);
  vec4 tex2ga = mix(tex2, tex2g, uProgress);

  vec4 tex4 = mix(tex1ga, tex2ga, smoothstep(uProgress - 0.3, uProgress + 0.3, uv.y));

  gl_FragColor = tex4;
}