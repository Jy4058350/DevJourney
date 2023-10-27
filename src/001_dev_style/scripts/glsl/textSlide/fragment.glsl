varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uActiveIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    vec4 color = mix(t1, t2, step(.5, uv.x));
    gl_FragColor = t2;
}