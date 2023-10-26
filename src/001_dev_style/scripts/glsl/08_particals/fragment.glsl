precision mediump float;

varying vec2 vUv;
uniform vec4 uResolution;
uniform float uTick;
uniform sampler2D texCurrent;
uniform sampler2D texNext;
uniform float uProgress;
varying float vProgress;

#pragma glslify: grayscale = require(../shader-helper/grayscale);
#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: curlNoise = require(../shader-helper/curl-noise);

void main() {

    // if(vProgress > 0.1 && distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    //     discard;
    // }
    vec2 uv = coverUv(vUv, uResolution);

    vec4 texC = texture(texCurrent, uv);
    vec4 texN = texture(texNext, uv);

    vec4 color = mix(texC, texN, uProgress);

    gl_FragColor = color;
    // gl_FragColor = texC;
    // gl_FragColor = texN;

}