precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uTex4;
uniform sampler2D uTex5;
uniform sampler2D uTex6;
uniform sampler2D uTex7;
uniform float uProgress;

// Function to select texture based on index
vec4 getTextureByIndex(float index, vec2 uv) {
  if(index == 0.0)
    return texture2D(uTex1, uv);
  if(index == 1.0)
    return texture2D(uTex2, uv);
  if(index == 2.0)
    return texture2D(uTex3, uv);
  if(index == 3.0)
    return texture2D(uTex4, uv);
  if(index == 4.0)
    return texture2D(uTex5, uv);
  if(index == 5.0)
    return texture2D(uTex6, uv);
  if(index == 6.0)
    return texture2D(uTex7, uv);
  return vec4(0.0);  // Default return value if index is not matched
}

void main() {
  vec2 uv = vUv;

  float totalSlides = 7.0;
  float slideIndex = uProgress * (totalSlides - 1.0);
  float currentSlide = floor(slideIndex);
  float nextSlide = min(floor(slideIndex) + 1.0, totalSlides - 1.0);
  float slideProgress = fract(slideIndex);

  // Sample colors from current and next slides
  vec4 currentColor = getTextureByIndex(currentSlide, uv);
  vec4 nextColor = getTextureByIndex(nextSlide, uv);

  // Interpolate between current and next colors based on slide progress
  vec4 finalColor = mix(currentColor, nextColor, slideProgress);
  gl_FragColor = finalColor;
}
