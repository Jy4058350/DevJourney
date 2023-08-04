// varying vec2 vUv;
// uniform sampler2D uTex;
// uniform float uTick;

varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

#pragma glslify: hsl = require(glsl-hsl2rgb);

void main() {
  float time = uTick * 0.0001;
  float hue = mod(vUv.x - time, 0.9); // Ensure hue is in the range [0, 1]
  float saturation = abs(sin(time)); // Vary the saturation over time
  float lightness = 0.5 + 0.2 * sin(time); // Vary the lightness over time
  vec3 rgb = hsl(hue, saturation, lightness);
  vec4 texColor = texture(uTex, vUv);

   // Apply the color effect by combining rgb and texColor
  vec3 modifiedColor = vec3(rgb.r, rgb.g, rgb.b);
  gl_FragColor = vec4(modifiedColor, texColor.a);
}