precision mediump float;

varying vec2 vUv;
varying float vDelay;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uTick;
uniform float uColorDelay;
uniform float uHover;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uProgress;

#pragma glslify: grayscale = require(../shader-helper/grayscale);
#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 tex1 = texture(tex1, uv);
    vec4 tex2 = texture(tex2, uv);

    vec4 tex = mix(tex1, tex2, uProgress);

    gl_FragColor = tex;

}