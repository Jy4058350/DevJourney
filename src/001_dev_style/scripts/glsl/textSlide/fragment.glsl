varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform float uIndex;
uniform float evenIdx;
uniform float uTest;
uniform float uResetAlpha;

varying float vDistanceAngle;

uniform float uProgress;
uniform float uProgress2;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution, uTest);
    vec4 t1 = texture2D(tex1, uv);

    float testAlfa = uResetAlpha;

    float alpha = smoothstep(0.9, 1.0, cos(vDistanceAngle)) * testAlfa;

    gl_FragColor = t1;

    // float alpha2 = t1.a * uProgress2;
    float alpha3 = t1.a * step(0.7, uProgress2);

    // gl_FragColor.a *= alpha;
    gl_FragColor.a = alpha * gl_FragColor.a * alpha3;

}