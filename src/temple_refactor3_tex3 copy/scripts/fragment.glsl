precision mediump float;

varying vec2 vUv;
uniform sampler2D tex1;
uniform sampler2D tex2;

uniform vec4 uResolution;
vec2 coverUv(vec2 uv , vec4 uResolution) {
return (uv - .5) * uResolution.zw + .5;
}


uniform vec4 uVClamp;
// vec2 clampUv(vec2 uv, vec4 uVClamp) {
// return (uv - .5) * uVClamp.zw + .5;
// // return clamp(uv, uVClamp.xy, uVClamp.zw);
// }

void main() {

  // vec2 uv = vUv;
vec2 uvb = coverUv(vUv, uResolution);

// vec2 uva = clampUv(vUv, uVClamp);
// vec4 texColor3 = texture2D(tex1, uva);
vec2 uvz = clamp(vUv, uVClamp.xy, uVClamp.zw);

vec4 texColor1 = texture2D(tex1, uvb);
vec4 texColor11 = texture2D(tex1, vUv);
vec4 texColor2 = texture2D(tex2, uvb);

gl_FragColor = mix(texColor1, texColor2, smoothstep(0.3, 0.5, vUv.x));
gl_FragColor = texColor11;
gl_FragColor = texColor1;
// gl_FragColor = texture2D(tex1, uvz);


}