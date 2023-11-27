varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform float uIndex;
uniform float tIndex;
uniform float uTest;

varying float vDistanceAngle;

uniform float uProgress;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution, uTest);

    vec4 t1 = texture2D(tex1, uv);

    // gl_FragColor = t1;

    float alpha = smoothstep(0.9, 1.0, cos(vDistanceAngle));
    alpha *= uProgress;

    gl_FragColor = t1;
    gl_FragColor.a *= alpha;

}