precision mediump float;

uniform float time;
varying vec2 vUv;
uniform float uTick;
uniform float uIndex;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uTex4;
uniform sampler2D uTex5;
uniform float uProgress;
uniform float uProgress1;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;
uniform float uProgress5;
uniform float uProgress6;
uniform float uProgress7;

vec4 toGray(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.287, 0.114));
  return vec4(vec3(gray), (color.a) * cos(gray) * 0.5);
}

void main() {

  vec2 uv = vUv;
  // float yCoordinate1 = vUv.y * (1.0 - uProgress1) * 2.0;
  // float yCoordinate1 = vUv.y * (1.0 - mod(uProgress1 + uTick, 1.0)) * 2.0;
  // float yCoordinate2 = vUv.y * (1.0 - mod(uProgress4 + uTick, 1.0)) * 2.0;
  float yCoordinate1 = vUv.y * (1.0 - uProgress1) * 2.0;
  float yCoordinate2 = vUv.y * (1.0 - uProgress4) * 2.0;

  //color
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);
  vec4 color3 = texture2D(uTex3, uv);
  vec4 color4 = texture2D(uTex4, uv);
  vec4 color5 = texture2D(uTex5, uv);

  //gracy
  vec4 grayColor1 = toGray((color1));
  vec4 grayColor2 = toGray((color2));
  vec4 grayColor3 = toGray((color3));
  vec4 grayColor4 = toGray((color4));
  vec4 grayColor5 = toGray((color5));

  //graycolored

  if(uIndex == 0.0) {
    gl_FragColor = color1;
  } else if(uIndex == 1.0) {
    //1 color1をbottomからgray&transparentに変換
    float alpha = mix(0.8, 0.5, uProgress1);
    gl_FragColor = mix(color1 * alpha, grayColor1, (0.5 - yCoordinate1));
  } else if(uIndex == 2.0) {
    //2 index=1のgrayColor1とgrayColor2をミックス
    float alpha = mix(1.0, 0.1, uProgress1);
    vec4 modifiedGrayColor1 = mix(color1 * alpha, grayColor1, (0.5 - yCoordinate1));
    gl_FragColor = mix(modifiedGrayColor1, grayColor2, uProgress2);
  } else if(uIndex == 3.0) {
    //3 grayColor2をcolor2に変換
    gl_FragColor = mix(grayColor2, color2, uProgress3);
     // colorをbottomからgray&transparentに変換
  } else if(uIndex == 4.0) {
    gl_FragColor = color2;
    //color2をbottomからgray&transparentに変換
  } else if(uIndex == 5.0) {
    float alpha = mix(0.8, 0.5, uProgress4);
    gl_FragColor = mix(color2, grayColor2, (0.5 - yCoordinate2));
  } else if(uIndex == 6.0) {
 //2 index=1のgrayColor1とgrayColor2をミックス
    float alpha = mix(1.0, 0.1, uProgress4);
    vec4 modifiedGrayColor2 = mix(color2 * alpha, grayColor3, (0.5 - yCoordinate2));
    gl_FragColor = mix(modifiedGrayColor2, grayColor3, uProgress5);
  } else if(uIndex == 7.0) {
    //3 grayColor2をcolor2に変換
    gl_FragColor = mix(grayColor3, color3, uProgress6);
  }

  // gl_FragColor = toGray(color1);
  // gl_FragColor = grayColor1;
  // gl_FragColor = mix(grayColor1, grayColor2, uProgress1);

  // float alpha = mix(0.8, 0.5, uProgress4);
  // gl_FragColor = mix(color2, grayColor2, (0.5 - yCoordinate3));
  // float alpha = mix(0.8, 0.5, uProgress4);
  // gl_FragColor =grayColor2;
}