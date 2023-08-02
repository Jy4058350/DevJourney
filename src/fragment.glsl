varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

void main() {
  float time = uTick * 0.01;
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      // vec4 texColor = texture(uTex, vUv);
      // gl_FragColor = texColor;

  color.r = texture(uTex, vUv + vec2(sin(time), 0.0)).r;
  color.g = texture(uTex, vUv + vec2(sin(time), 0.0)).g;
  color.b = texture(uTex, vUv + vec2(sin(time), 0.0)).b;

  gl_FragColor = color;

}
