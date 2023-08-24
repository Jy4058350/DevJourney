precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uMask;
uniform float uTick;
uniform float uProgress;
varying float vDelay;
uniform vec3 uEmissionColor;
uniform float uEmissionStrength;
uniform vec2 uMouse;
uniform float uHover;

void main() {

  vec2 uv = vUv;

  vec4 color1 = texture2D(uTex1, vUv);

  gl_FragColor = vec4(vDelay, 0.0, 0.0, 1.0);
  gl_FragColor = color1;

  vec2 mouse = step(uMouse, vUv);
  gl_FragColor = vec4(mouse, uHover, 1.0);
}
