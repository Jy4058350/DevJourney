varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uProgress;
uniform float uProgress1;
uniform float uTick;
uniform float uIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: zoomUv = require(../shader-helper/zoomUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);
    vec2 zoomedUv = zoomUv(vUv, uResolution, uProgress1, uTick);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    vec4 t1a = texture2D(tex1, zoomedUv);
    vec4 t2a = texture2D(tex2, zoomedUv);

    t1.a = 1.0 - uProgress;
    t2.a = uProgress;

    //variable definition
    float variable = clamp(uProgress, 0.0, 0.5);

    if(uIndex == 0.0) {
        vec4 color = mix(t2, t1, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 1.0) {
        float uProgress1 = 0.0;
        gl_FragColor = t2a;
    }

    // gl_FragColor = t2a;
    // gl_FragColor = t1a;

}