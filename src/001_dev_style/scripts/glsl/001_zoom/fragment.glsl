varying vec2 vUv;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uHover;
uniform sampler2D tex1;
uniform float uIndex;
uniform float uProgress;
uniform float uTest;
uniform float uTick;
uniform float uRaito;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: zoomUv2 = require(../shader-helper/zoomUv2);

void main() {

    vec2 mouse = uMouse;
    vec2 uv = coverUv(vUv, uResolution, uTest);

    
    vec2 zoomedUv2 = zoomUv2(uv, uResolution, uProgress, uTick, uRaito);

    vec4 t1 = texture2D(tex1, zoomedUv2);

    gl_FragColor = t1;
}
