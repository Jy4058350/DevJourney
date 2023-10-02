precision lowp float;

varying vec2 vUv;

uniform sampler2D tex1;
uniform float uProgress;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  vec4 tex = texture(tex1, vUv);

  gl_FragColor = tex;
}