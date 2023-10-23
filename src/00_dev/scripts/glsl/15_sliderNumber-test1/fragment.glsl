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

uniform sampler2D textures[8];

uniform float radius;
uniform float radius1;

uniform float xOffset;
uniform float yOffset;
uniform float uRaito;

uniform float uProgress;
uniform float uTick;
uniform float uIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: zoomUv2 = require(../shader-helper/zoomUv2);
#pragma glslify: zoomUv3 = require(../shader-helper/zoomUv3);
#pragma glslify: panUv = require(../shader-helper/panUv);
#pragma glslify: panUv1 = require(../shader-helper/panUv1);
#pragma glslify: panUv2 = require(../shader-helper/panUv2);
#pragma glslify: panUv3 = require(../shader-helper/panUv3);
#pragma glslify: distanceFromCenter = require(../shader-helper/distanceFromCenter);
#pragma glslify: calculateAngle = require(../shader-helper/calculateAngle);

uniform int textureIndex;

void main() {

    vec2 center = vec2(0.5, 0.5);
    vec2 delta = vUv - center;
    float angle = degrees(atan(delta.y, delta.x));
    float startAngle = -180.0;
    float endAngle = 180.0;

// uProgressによる角度の補間
    float interpolatedAngle = mix(startAngle, endAngle, (1.0 - uProgress));

    vec4 c1 = texture2D(tex1, vUv);
    vec4 c2 = texture2D(tex2, vUv);

// 指定の角度範囲内にある場合にテクスチャを切り替える
    gl_FragColor = (angle >= interpolatedAngle && angle <= endAngle) ? c1 : c2;

}