varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform float uIndex;

varying float vDistanceAngle;

#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);

    gl_FragColor = t1;

    float alpha = smoothstep(0.9, 1.0, cos(vDistanceAngle));
    gl_FragColor.a *= alpha;

}