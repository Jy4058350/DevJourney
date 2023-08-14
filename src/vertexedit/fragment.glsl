precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;
varying float vExpandTime;

void main() {

  vec2 uv = vUv;
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);

  gl_FragColor = vec4(vExpandTime, 0.,0.,1.);

}