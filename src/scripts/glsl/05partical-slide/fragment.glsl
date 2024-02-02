precision lowp float;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

varying vec2 vUv;

uniform sampler2D texCurrent;
uniform sampler2D texNext;

uniform float uProgress;
varying float vProgress;
varying float vAlpha;
uniform vec4 uResolution;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  vec2 uv = coverUv(vUv, uResolution);

  if(vProgress > 0.1 && distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }

  vec4 texC = texture(texCurrent, uv);
  vec4 texN = texture(texNext, uv);
  vec4 color = mix(texC, texN, uProgress);
  color.a = vAlpha;
  gl_FragColor = color;
  // gl_FragColor = texC;
  // gl_FragColor = texN;
}