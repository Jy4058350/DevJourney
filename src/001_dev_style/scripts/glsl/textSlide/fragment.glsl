varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;


#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    gl_FragColor = t1;
}