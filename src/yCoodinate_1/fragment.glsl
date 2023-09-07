precision mediump float;

uniform sampler2D uTex1;
uniform sampler2D uTex2;

uniform float uTick;
uniform float uProgress;

varying vec2 vUv;
void main() {

  vec2 uv = vUv;

  vec4 tex1 = texture(uTex1, uv);
  vec4 tex2 = texture(uTex2, uv);

  gl_FragColor = mix(tex1, tex2, step(uProgress, uv.y ));

}