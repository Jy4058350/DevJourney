precision mediump float;

varying vec2 vUv;
uniform float uIndex;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uProgress;
uniform float uProgress1;
uniform float uProgress2;
uniform float uProgress3;

vec4 toGray(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  return vec4(vec3(gray), color.a);
}

void main() {

  vec2 uv = vUv;

  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);

  vec4 grayColor1 = toGray((color1));
  vec4 grayColor2 = toGray((color2));

  if(uIndex == 0.0) {
    gl_FragColor = color1;
  } else if(uIndex == 1.0) {
    // color1をgrayColor1に変換
    gl_FragColor = mix(color1, grayColor1, uProgress1);
  } else if(uIndex == 2.0) {
    // grayColor1とgrayColor2をミックス
    gl_FragColor = mix(grayColor1, grayColor2, uProgress2);
  } else if(uIndex == 3.0) {
    // grayColor2をcolor2に変換
    gl_FragColor = mix(grayColor2, color2, uProgress3);
  }

  // gl_FragColor = toGray(color1);
  // gl_FragColor = grayColor1;
  // gl_FragColor = mix(grayColor1, grayColor2, uProgress1);
}
