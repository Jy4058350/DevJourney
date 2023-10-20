varying vec2 vUv;
uniform vec4 uResolution;

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

    // // float radius = radius;
    // // float radius1 = radius1;

    // float distance = distanceFromCenter(vUv, uResolution);
    // //Common variables
    // vec2 u = coverUv(vUv, uResolution);
    // vec2 zoomedUv2 = zoomUv2(vUv, uResolution, uProgress, uTick, uRaito);
    // vec2 zoomedUv3 = zoomUv3(vUv, uResolution, uProgress, uTick, uRaito);
    // // vec2 center = vec2(0.5, 0.5);

    // // 4 pan transitions
    // vec2 uv = panUv(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    // vec2 uv1 = panUv1(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    // vec2 uv2 = panUv2(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    // vec2 uv3 = panUv3(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);

    // //try other slide transitions here 7textures
    int currentTexture = int(uProgress * 7.0);
    float currentTextureFloat = float(currentTexture);
    // float texBlend = fract(uProgress * 7.0);

    // //Get selected texture
    // // vec4 currentTex = texture2D(textures[currentTexture], vUv);

    // //Conditional branching for texture selection
    // if(uIndex < 2.0) {
    //     //Selected texture and blend
    //     vec4 color;
    //     if(distance < radius) {
    //         color = texture2D(currentTex, zoomedUv2);
    //     } else {
    //         // Calculate angle
    //         float angle = calculateAngle(uv, uProgress);
    //         if(distance < radius1) {
    //             if(angle >= 0.0 && angle < uProgress * 270.0) {
    //                 color = texture2D(currentTex, uv);
    //             } else {
    //                 color = mix(texture2D(currentTex, uv), texture2D(textures[currentTexture + 1], uv), texBlend);
    //             }
    //         }
    //     }
    // }
    // if(uIndex == 1.0) {
    //     gl_FragColor = texture2D(currentTex, zoomedUv3);
    // }

    if(uIndex == 0.0) {
        currentTextureFloat = 5.0;
        // vec4 c = texture2D(textures[5], vUv);
        vec4 c = texture2D(textures[currentTextureFloat], vUv);
        gl_FragColor = c;
    }
}