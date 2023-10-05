varying vec2 vUv;
varying float vDelay;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uTick;
uniform float uSaturation;
uniform float uBrightness;
uniform float uColorTime;
uniform float uColorDelay;
uniform float uHover;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform float uProgress;

#pragma glslify: hsl12rgb = require(glsl-hsl2rgb);

vec2 coverUv(vec2 uv, vec4 resolution) {
    return (uv - .5) * resolution.zw + .5;
}

void main() {
    vec4 tex = texture(tex1, gl_PointCoord);

    float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * .5 + .5;
    vec3 rgb = hsl12rgb(vec3(hue, uSaturation, uBrightness));
    gl_FragColor = vec4(rgb, 1.0);

}