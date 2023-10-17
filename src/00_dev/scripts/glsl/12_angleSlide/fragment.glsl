varying vec2 vUv;
uniform vec4 uResolution;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform sampler2D tex5;
uniform sampler2D tex6;
uniform sampler2D tex7;
uniform sampler2D tex8;
uniform float uSpeed;
uniform float xOffset;
uniform float yOffset;

uniform float uProgress;
uniform float uProgress1;
uniform float uTick;
uniform float uIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: zoomUv2 = require(../shader-helper/zoomUv2);
#pragma glslify: panUv = require(../shader-helper/panUv);
#pragma glslify: panUv1 = require(../shader-helper/panUv1);
#pragma glslify: panUv2 = require(../shader-helper/panUv2);
#pragma glslify: panUv3 = require(../shader-helper/panUv3);

void main() {
    vec2 uv = vUv;

    // Calculate the angle from the center based on uProgress
    vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float angle = degrees(atan(delta.x, delta.y));
    float a = uProgress * 360.0;

    // Ensure the angle is positive and within the range of 0 to 360 degrees
    angle = mod(angle, 360.0);

    // Calculate the texture blend based on the angle
    float texBlend;

    // Switch between textures based on the angle
    // if(angle >= 0.0 && angle <  310.0) {
    if(angle >= 0.0 && angle < a) {
        gl_FragColor = texture2D(tex2, uv);
    } else {
        gl_FragColor = texture2D(tex1, uv);
    }
}
