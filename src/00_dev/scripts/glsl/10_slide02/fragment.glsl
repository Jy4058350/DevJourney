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
    float uTick = uTick;
    vec2 zoomedUv = zoomUv(vUv, uResolution, uProgress1 * uSpeed, uTick);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    vec4 t3 = texture2D(tex3, uv);
    vec4 t4 = texture2D(tex4, uv);
    vec4 t5 = texture2D(tex5, uv);
    vec4 t6 = texture2D(tex6, uv);
    vec4 t1a = texture2D(tex1, zoomedUv);
    vec4 t2a = texture2D(tex2, zoomedUv);
    vec4 t3a = texture2D(tex3, zoomedUv);
    vec4 t4a = texture2D(tex4, zoomedUv);
    vec4 t5a = texture2D(tex5, zoomedUv);
    vec4 t6a = texture2D(tex6, zoomedUv);

    t1.a = 1.0 - uProgress;
    t2.a = uProgress;

    //variable definition
    float variable = clamp(uProgress, 0.0, 0.5);

    if(uIndex == 0.0) {
        vec4 color = mix(t2, t1a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 1.0) {
        gl_FragColor = t2a;
    }

    if(uIndex == 2.0) {
        t1.a = uProgress;
        vec4 color = mix(t3, t2a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 3.0) {
        gl_FragColor = t3a;
    }

    if(uIndex == 4.0) {
        vec4 color = mix(t4, t3a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 5.0) {
        gl_FragColor = t4a;
    }

    if(uIndex == 6.0) {
        t1.a = uProgress;
        vec4 color = mix(t5, t4a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 7.0) {
        gl_FragColor = t5a;
    }

    if(uIndex == 8.0) {
        vec4 color = mix(t6, t5a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 9.0) {
        gl_FragColor = t6a;
    }

    if(uIndex == 10.0) {
        t1.a = uProgress;
        vec4 color = mix(t1, t6a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

    if(uIndex == 11.0) {
        gl_FragColor = t1a;
    }

    if(uIndex == 12.0) {
        vec4 color = mix(t2, t1a, smoothstep(uProgress, uProgress + variable, uv.y));
        gl_FragColor = color;
    }

}