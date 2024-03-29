precision mediump float;
varying vec2 vUv;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uHover;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uProgress;
uniform int uIndex;
uniform sampler2D textures[2];

vec2 coverUv(vec2 uv, vec4 resolution) {
    return (uv - .5) * resolution.zw + .5;
}

void main() {
          // vec2 mouse = step(uMouse, vUv);
          // gl_FragColor = vec4(mouse, uHover, 1.);

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    // vec4 color = mix(t1, t2, step(.5, uv.x));
    vec4 color = mix(t1, t2, step(uProgress, uv.x));

    gl_FragColor = color;

    vec4 colorI = texture2D(textures[uIndex], uv);
    gl_FragColor = colorI;

}
