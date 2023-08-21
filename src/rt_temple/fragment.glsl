precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 fuv = vUv;
  fuv.y = fract(fuv.y * 2.0);
  vec4 color = texture(uTex1, fuv);

  gl_FragColor = color;

}