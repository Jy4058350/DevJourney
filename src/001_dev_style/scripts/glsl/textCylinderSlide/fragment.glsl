varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;

varying float vDistanceProgress;
varying float vScaleProgress;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);

    uv = uv - 0.5;
    float scale = mix(0.7, 1.0, vScaleProgress);
    uv = uv * scale;
    uv = uv + 0.5;

    gl_FragColor = t1;

    gl_FragColor.a = mix(0.0, t1.a, vDistanceProgress);

}