varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uProgress;

vec2 coverUv(vec2 uv, vec4 resolution) {
    return (uv - .5) * resolution.zw + .5;
}

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);

    t1.a = uProgress;
    t2.a = 1.0 - uProgress;

    //variable definition
    float variable = clamp(uProgress, 0.0, 0.5);

    vec4 color = mix(t1, t2, smoothstep(uProgress, uProgress + variable, uv.y));
    gl_FragColor = color;
}