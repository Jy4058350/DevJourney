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



void main() {
    vec4 tex = texture(tex1, vUv);

    gl_FragColor = tex;

}