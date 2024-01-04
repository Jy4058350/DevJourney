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

// uniform sampler2D textures[8];

uniform float radius;
uniform float radius1;

uniform float xOffset;
uniform float yOffset;
uniform float uRaito;

uniform float uProgress;
uniform float uTick;
uniform float uIndex;
uniform float uTest;

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

vec4 transition(vec2 uv, vec2 uv1, vec2 uv2, vec2 vu3, float progress, float texBlend) {

    float distance = distanceFromCenter(vUv, uResolution);
    vec2 u = coverUv(vUv, uResolution, uTest);

    vec2 zoomedUv2 = zoomUv2(u, uResolution, uProgress, uTick, uRaito);
    vec2 zoomedUv3 = zoomUv3(u, uResolution, uProgress, uTick, uRaito);
    vec4 color;

    if(distance < radius) {
        vec4 c1 = texture2D(tex8, zoomedUv2);
        vec4 c2 = texture2D(tex1, zoomedUv2);
        color = mix(c1, c2, uProgress);

    } else {
        if(distance < radius1) {
            float startAngle = -180.0;
            float endAngle = 180.0;

            vec2 center1 = vec2(0.5, 0.5);
            vec2 delta1 = vUv - center1;
            float angle = degrees(atan(delta1.y, delta1.x));
            float iangle = mix(startAngle, endAngle, (1.0 - uProgress));
            color = (angle >= iangle && angle <= endAngle) ? texture2D(tex1, uv) : texture2D(tex2, uv);

        } else {
            int currentTexture = int(uProgress * 8.0);
            if(currentTexture == 0) {
                color = mix(texture2D(tex1, uv), texture2D(tex2, uv), texBlend);
            } else if(currentTexture == 1) {
                color = mix(texture2D(tex2, uv), texture2D(tex3, uv), texBlend);
            }
        }
    }
    return color;
}

void main() {

    vec2 u = coverUv(vUv, uResolution, uTest);
    vec2 zoomedUv2 = zoomUv2(u, uResolution, uProgress, uTick, uRaito);
    vec2 zoomedUv3 = zoomUv3(u, uResolution, uProgress, uTick, uRaito);

    // 4 pan transitions
    vec2 uv = panUv(u, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv1 = panUv1(u, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv2 = panUv2(u, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv3 = panUv3(u, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);

    int currentTexture = int(uProgress * 8.0);
    float texBlend = fract(uProgress * 8.0);

    float angle = calculateAngle(uv, uProgress);
    if(uIndex == 0.0) {
        vec4 color = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color1 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color2 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color3 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);

        vec4 c = mix(color, color1, step(0.5, vUv.x));
        vec4 d = mix(color2, color3, step(0.5, vUv.x));
        gl_FragColor = mix(c, d, step(0.5, vUv.y));
    } else if(uIndex == 1.0) {
        gl_FragColor = texture2D(tex1, zoomedUv3);

    }
    if(uIndex == 2.0) {
        vec4 color = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color1 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color2 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);
        vec4 color3 = transition(uv, uv1, uv2, uv3, uProgress, texBlend);

        vec4 c = mix(color, color1, step(0.5, vUv.x));
        vec4 d = mix(color2, color3, step(0.5, vUv.x));
        gl_FragColor = mix(c, d, step(0.5, vUv.y));
    } else if(uIndex == 3.0) {
        gl_FragColor = texture2D(tex1, zoomedUv3);

    }
}
