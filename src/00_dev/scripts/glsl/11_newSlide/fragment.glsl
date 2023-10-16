varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform sampler2D tex5;
uniform sampler2D tex6;
uniform float uSpeed;

uniform float uProgress;
uniform float uProgress1;
uniform float uTick;
uniform float uIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: zoomUv = require(../shader-helper/zoomUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    vec4 t3 = texture2D(tex3, uv);
    vec4 t4 = texture2D(tex4, uv);

    vec4 m12 = mix(t1, t2, step(0.5, uv.y));
    vec4 m34 = mix(t3, t4, step(0.5, uv.y));
    vec4 m1234 = mix(m12, m34, step(0.5, uv.x));
    gl_FragColor = m1234;

}