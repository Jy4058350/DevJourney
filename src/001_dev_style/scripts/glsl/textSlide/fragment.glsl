varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform float uProgress;

varying float vScaleProgress;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);

    uv = uv - 0.5;
    float scale = mix(0.7, 1.0, vScaleProgress);
    uv = uv * scale;
    uv = uv + 0.5;


    vec4 t2 = vec4(1.0, 0.0, 0.0, 1.0);

    gl_FragColor = t1;

    gl_FragColor = mix(t1, t2, uProgress);

}