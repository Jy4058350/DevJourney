precision mediump float;

varying vec2 vUv;
uniform sampler2D tex1;
uniform sampler2D tex2;

void main() {

  vec2 uv = vUv;
  vec4 texColor1 = texture2D(tex1, uv);
  vec4 texColor2 = texture2D(tex2, uv);
  gl_FragColor = mix(texColor1, texColor2, smoothstep(0.3, 0.5, uv.x));

}