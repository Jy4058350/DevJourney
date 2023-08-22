precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uMask;
uniform float uTick;
uniform float uProgress;
varying float vDelay;

void main() {

  vec4 color1 = texture2D(uTex1, vUv);

  gl_FragColor = vec4(vDelay, 0.0, 0.0, 1.0);
  gl_FragColor = color1;
}
