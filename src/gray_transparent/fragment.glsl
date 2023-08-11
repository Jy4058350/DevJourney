precision mediump float;

varying vec2 vUv;
uniform float uIndex;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
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
  float yCoordinate1 = vUv.y * (0.3 - uProgress1);

  //color
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);

  //gracy
  vec4 grayColor1 = toGray((color1));
  vec4 grayColor2 = toGray((color2));

  //graycolored

  if(uIndex == 0.0) {
    gl_FragColor = color1;
  } else if(uIndex == 1.0) {
    // color1をbottomからgray&transparentに変換
    float alpha = mix(1.0, 0.5, uProgress1);
    gl_FragColor = mix(color1 * alpha, grayColor1, (1.0 - yCoordinate1));
  } else if(uIndex == 2.0) {
    // index=1のgrayColor1とgrayColor2をミックス
    float alpha = mix(1.0, 0.5, uProgress1);
    vec4 modifiedGrayColor1 = mix(color1 * alpha, grayColor1 * alpha, (1.0 - yCoordinate1));
    gl_FragColor = mix(modifiedGrayColor1, grayColor2, uProgress2);
  } else if(uIndex == 3.0) {
    // grayColor2をcolor2に変換
    gl_FragColor = mix(grayColor2, color2, uProgress3);
  } else if(uIndex ==4.0) {
    gl_FragColor = color2;
  }

  // gl_FragColor = toGray(color1);
  // gl_FragColor = grayColor1;
  // gl_FragColor = mix(grayColor1, grayColor2, uProgress1);
}
