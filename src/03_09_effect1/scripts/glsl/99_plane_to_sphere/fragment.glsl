precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform float uProgress;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  vec4 tex = texture(uTex, vUv);
  
  // gl_FragColor = vec4(vDelay, 0., 0., 1.);
  gl_FragColor = tex;
}