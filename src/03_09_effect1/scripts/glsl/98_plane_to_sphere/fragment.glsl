precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D tex1;
uniform float uProgress;
uniform float uTick;
uniform float uSaturation;
uniform float uBrightness;
uniform float uColorTime;
uniform float uColorDelay;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  vec4 tex = texture(tex1, gl_PointCoord);

  float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * 0.5 + 0.5;
  vec3 rgb = hsl2rgb(vec3(hue, uSaturation, uBrightness));
  gl_FragColor = vec4(rgb, 1.);
}