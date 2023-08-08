precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;

  uv = uv * (1.0 - (uProgress * 0.1));
  // uv *= 1.0 + uProgress;//上記と同じ

  vec4 color = texture2D(uTex1, uv);

  gl_FragColor = color;

}