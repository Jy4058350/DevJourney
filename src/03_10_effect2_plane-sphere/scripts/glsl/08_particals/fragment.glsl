precision mediump float;

varying vec2 vUv;
uniform vec4 uResolution;
uniform float uTick;
uniform sampler2D texCurrent;
uniform sampler2D texNext;
uniform float uProgress;

#pragma glslify: grayscale = require(../shader-helper/grayscale);
#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 texC = texture(texCurrent, uv);
    vec4 texN = texture(texNext, uv);

    vec4 color = mix(texC, texN, uProgress);

    gl_FragColor = color;
    // gl_FragColor = texC;
    // gl_FragColor = texN;

}