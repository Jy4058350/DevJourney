varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

#pragma glslify: hsl = require(glsl-hsl2rgb);

void main() {
  float time = uTick * 0.001;
  vec3 rgb = hsl(fract(vUv.x -time),1.0 , 0.5);
  // vec4 color = vec4(rgb, 1.0);
  vec4 texColor = texture(uTex, vUv);

  // Apply the color effect by combining rgb and texColor
  vec3 modifiedColor = vec3(rgb.r, texColor.g, texColor.b);
  gl_FragColor = vec4(modifiedColor, texColor.a);

  

}
