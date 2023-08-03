varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

void main() {
  float time = uTick * 0.02;
  const float AMP = 0.05;
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  vec4 texColor = texture(uTex, vUv);
  gl_FragColor = texColor;

  // color.r = texture(uTex, vUv + vec2(AMP * sin(time), 0.0)).r;
  // color.g = texture(uTex, vUv + vec2(AMP * sin(time), 0.0)).g;
  // color.b = texture(uTex, vUv + vec2(AMP * sin(time), 0.0)).b;

  // gl_FragColor = color;

}
