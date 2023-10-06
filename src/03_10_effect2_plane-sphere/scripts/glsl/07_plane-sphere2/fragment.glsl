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
varying float vProgress;

void main() {
    vec4 tex = texture(tex1, vUv);
    vec4 sphereTexColor = vec4(1.0, 0.0, 1.0, 1.0);

    vec4 color = mix(sphereTexColor, tex, vProgress);
    gl_FragColor = color;

}