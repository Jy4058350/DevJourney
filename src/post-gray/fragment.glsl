precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uTex4;
uniform float uTick;
uniform float uProgress;
uniform float uProgress1;
uniform float uIndex;
varying float vExpandTime;

vec4 toGray(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  return vec4(vec3(gray), color.a);
}

void main() {

  vec2 uv = vUv;
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);
  vec4 color3 = texture2D(uTex3, uv);
  vec4 color4 = texture2D(uTex4, uv);

  // vec4 startcolor;

  if(uIndex == 0.0) {
    gl_FragColor = mix(color1, color1, uProgress);
  }

  if(uIndex == 1.0) {
    gl_FragColor = mix(color1, toGray(color1), uProgress1);
   

  }

  if(uIndex == 2.0) {
    gl_FragColor = mix(color3, color4, uProgress1);
  }

}