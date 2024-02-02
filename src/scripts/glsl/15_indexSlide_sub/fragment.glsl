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

    // float radius = radius;
    // float radius1 = radius1;

    float distance = distanceFromCenter(vUv, uResolution);
    //Common variables
    vec2 u = coverUv(vUv, uResolution);
    vec2 zoomedUv2 = zoomUv2(vUv, uResolution, uProgress, uTick, uRaito);
    vec2 zoomedUv3 = zoomUv3(vUv, uResolution, uProgress, uTick, uRaito);
    // vec2 center = vec2(0.5, 0.5);

    // 4 pan transitions
    vec2 uv = panUv(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv1 = panUv1(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv2 = panUv2(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
    vec2 uv3 = panUv3(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);

//setthing index for transitions 7textures
    int currentTexture = int(uProgress * 7.0);
    float texBlend = fract(uProgress * 7.0);

//get selected texture
    sampler2D currentTex = textures[textureIndex];

//Conditional branching for texture selection
    if(uIndex < 2.0) {
    //Texture selection and blending
        vec4 color;
        if(distance < radius) {
            color = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color = texture2D(currentTex, uv);
                } else {
                    color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color1;
        if(distance < radius) {
            color1 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color1 = texture2D(currentTex, uv);
                } else {
                    color1 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color1 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color2;
        if(distance < radius) {
            color2 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color2 = texture2D(currentTex, uv);
                } else {
                    color2 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color2 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color3;
        if(distance < radius) {
            color3 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color3 = texture2D(currentTex, uv);
                } else {
                    color3 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color3 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        //Color composition
        vec4 c = mix(color, color1, step(0.5, vUv.x));
        vec4 d = mix(color2, color3, step(0.5, vUv.x));
        vec4 e = mix(c, d, step(0.5, vUv.y));
        gl_FragColor = e;
    }
    if(uIndex == 1.0) {
        gl_FragColor = texture2D(tex1, zoomedUv3);
    } else if( uIndex == 2.0) {
         //Texture selection and blending
        vec4 color;
        if(distance < radius) {
            color = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color = texture2D(currentTex, uv);
                } else {
                    color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color1;
        if(distance < radius) {
            color1 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color1 = texture2D(currentTex, uv);
                } else {
                    color1 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color1 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color2;
        if(distance < radius) {
            color2 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color2 = texture2D(currentTex, uv);
                } else {
                    color2 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color2 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        vec4 color3;
        if(distance < radius) {
            color3 = texture2D(currentTex, zoomedUv2);
        } else {
        // Calculate angle
            float angle = caluculateAngle(uv, uProgress);
            if(distance < radius1) {
                if(angle >= 0.0 && angle < uProgress * 270.0) {
                    color3 = texture2D(currentTex, uv);
                } else {
                    color3 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
                }
            } else {
                color3 = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1.0], uv), texBlend);
            }
        }
        //Color composition
        vec4 c = mix(color, color1, step(0.5, vUv.x));
        vec4 d = mix(color2, color3, step(0.5, vUv.x));
        vec4 e = mix(c, d, step(0.5, vUv.y));
        gl_FragColor = e;
    }
    if(uIndex == 1.0) {
        gl_FragColor = texture2D(tex1, zoomedUv3);
    }
}


// end edit here 

// float angle = calculateAngle(uv, uProgress);
// if(uIndex == 0.0) {
//     // Blend between the current and next textures
// vec4 color; //lower left

// if(distance < radius) {
// color = texture2D(tex1, zoomedUv2);
// } else {
// if(distance < radius1) {
//             // if(angle >= 0.0 && angle < calculateAngle(uv, uProgress)) {
// if(angle >= 0.0 && angle < uProgress * 270.0) {
// color = texture2D(tex1, uv);
// } else {
//                 // color = texture2D(tex4, uv);
// color = mix(texture2D(tex1, uv), texture2D(tex2, uv), texBlend);
// }

// } else if(currentTexture == 0) {
// color = mix(texture2D(tex1, uv), texture2D(tex2, uv), texBlend);
// } else if(currentTexture == 1) {
// color = mix(texture2D(tex2, uv), texture2D(tex3, uv), texBlend);
// } else if(currentTexture == 2) {
// color = mix(texture2D(tex3, uv), texture2D(tex4, uv), texBlend);
// } else if(currentTexture == 3) {
// color = mix(texture2D(tex4, uv), texture2D(tex5, uv), texBlend);
// } else if(currentTexture == 4) {
// color = mix(texture2D(tex5, uv), texture2D(tex6, uv), texBlend);
// } else if(currentTexture == 5) {
// color = mix(texture2D(tex6, uv), texture2D(tex7, uv), texBlend);
// } else if(currentTexture == 6) {
// color = mix(texture2D(tex1, uv), texture2D(tex8, uv), texBlend);
// } else {
// color = texture2D(tex1, uv);

// }
// }
// vec4 color1;
// if(distance < radius) {
// color1 = texture2D(tex1, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 180.0) {
// color1 = texture2D(tex1, uv1);
// } else {
//                 // color1 = texture2D(tex4, uv1);
// color1 = mix(texture2D(tex1, uv1), texture2D(tex2, uv1), texBlend);
// }
// } else if(currentTexture == 0) {
// color1 = mix(texture2D(tex1, uv1), texture2D(tex2, uv1), texBlend);
// } else if(currentTexture == 1) {
// color1 = mix(texture2D(tex2, uv1), texture2D(tex3, uv1), texBlend);
// } else if(currentTexture == 2) {
// color1 = mix(texture2D(tex3, uv1), texture2D(tex4, uv1), texBlend);
// } else if(currentTexture == 3) {
// color1 = mix(texture2D(tex4, uv1), texture2D(tex5, uv1), texBlend);
// } else if(currentTexture == 4) {
// color1 = mix(texture2D(tex5, uv1), texture2D(tex6, uv1), texBlend);
// } else if(currentTexture == 5) {
// color1 = mix(texture2D(tex6, uv1), texture2D(tex7, uv1), texBlend);
// } else if(currentTexture == 6) {
// color1 = mix(texture2D(tex1, uv1), texture2D(tex8, uv1), texBlend);
// } else {
// color1 = texture2D(tex1, uv1);
// }
// }
// vec4 color2;
// if(distance < radius) {
// color2 = texture2D(tex1, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 360.0) {
// color2 = texture2D(tex1, uv2);
// } else {
//                 // color2 = texture2D(tex4, uv2);
// color2 = mix(texture2D(tex1, uv2), texture2D(tex2, uv2), texBlend);
// }
// } else if(currentTexture == 0) {
// color2 = mix(texture2D(tex1, uv2), texture2D(tex2, uv2), texBlend);
// } else if(currentTexture == 1) {
// color2 = mix(texture2D(tex2, uv2), texture2D(tex3, uv2), texBlend);
// } else if(currentTexture == 2) {
// color2 = mix(texture2D(tex3, uv2), texture2D(tex4, uv2), texBlend);
// } else if(currentTexture == 3) {
// color2 = mix(texture2D(tex4, uv2), texture2D(tex5, uv2), texBlend);
// } else if(currentTexture == 4) {
// color2 = mix(texture2D(tex5, uv2), texture2D(tex6, uv2), texBlend);
// } else if(currentTexture == 5) {
// color2 = mix(texture2D(tex6, uv2), texture2D(tex7, uv2), texBlend);
// } else if(currentTexture == 6) {
// color2 = mix(texture2D(tex1, uv2), texture2D(tex8, uv2), texBlend);
// } else {
// color2 = texture2D(tex1, uv2);
// }
// }
// vec4 color3;
// if(distance < radius) {
// color3 = texture2D(tex1, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 90.0) {
// color3 = texture2D(tex1, uv3);
// } else {
//                 // color3 = texture2D(tex1, uv3);
// color3 = mix(texture2D(tex1, uv3), texture2D(tex2, uv3), texBlend);
// }
// } else if(currentTexture == 0) {
// color3 = mix(texture2D(tex1, uv3), texture2D(tex2, uv3), texBlend);
// } else if(currentTexture == 1) {
// color3 = mix(texture2D(tex2, uv3), texture2D(tex3, uv3), texBlend);
// } else if(currentTexture == 2) {
// color3 = mix(texture2D(tex3, uv3), texture2D(tex4, uv3), texBlend);
// } else if(currentTexture == 3) {
// color3 = mix(texture2D(tex4, uv3), texture2D(tex5, uv3), texBlend);
// } else if(currentTexture == 4) {
// color3 = mix(texture2D(tex5, uv3), texture2D(tex6, uv3), texBlend);
// } else if(currentTexture == 5) {
// color3 = mix(texture2D(tex6, uv3), texture2D(tex7, uv3), texBlend);
// } else if(currentTexture == 6) {
// color3 = mix(texture2D(tex1, uv3), texture2D(tex8, uv3), texBlend);
// } else {
// color3 = texture2D(tex1, uv3);
// }
// }

// //Color composition
// vec4 c = mix(color, color1, step(0.5, vUv.x));
// vec4 d = mix(color2, color3, step(0.5, vUv.x));
// vec4 e = mix(c, d, step(0.5, vUv.y));
// gl_FragColor = e;
// }
// if(uIndex == 1.0) {
// gl_FragColor = texture2D(tex1, zoomedUv3);
// }

// // index == 2.0

// if(uIndex == 2.0) {
//     // Blend between the current and next textures
// vec4 color; //lower left

// if(distance < radius) {
// color = texture2D(tex2, zoomedUv2);
// } else {
// if(distance < radius1) {
//             // if(angle >= 0.0 && angle < calculateAngle(uv, uProgress)) {
// if(angle >= 0.0 && angle < uProgress * 270.0) {
// color = texture2D(tex2, uv);
// } else {
//                 // color = texture2D(tex4, uv);
// color = mix(texture2D(tex2, uv), texture2D(tex3, uv), texBlend);
// }

// } else if(currentTexture == 0) {
// color = mix(texture2D(tex2, uv), texture2D(tex3, uv), texBlend);
// } else if(currentTexture == 1) {
// color = mix(texture2D(tex3, uv), texture2D(tex4, uv), texBlend);
// } else if(currentTexture == 2) {
// color = mix(texture2D(tex4, uv), texture2D(tex5, uv), texBlend);
// } else if(currentTexture == 3) {
// color = mix(texture2D(tex5, uv), texture2D(tex6, uv), texBlend);
// } else if(currentTexture == 4) {
// color = mix(texture2D(tex6, uv), texture2D(tex7, uv), texBlend);
// } else if(currentTexture == 5) {
// color = mix(texture2D(tex7, uv), texture2D(tex8, uv), texBlend);
// } else if(currentTexture == 6) {
// color = mix(texture2D(tex8, uv), texture2D(tex1, uv), texBlend);
// } else {
// color = texture2D(tex1, uv);

// }
// }
// vec4 color1;
// if(distance < radius) {
// color1 = texture2D(tex2, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 180.0) {
// color1 = texture2D(tex2, uv1);
// } else {
//                 // color1 = texture2D(tex4, uv1);
// color1 = mix(texture2D(tex2, uv1), texture2D(tex3, uv1), texBlend);
// }
// } else if(currentTexture == 0) {
// color1 = mix(texture2D(tex2, uv1), texture2D(tex3, uv1), texBlend);
// } else if(currentTexture == 1) {
// color1 = mix(texture2D(tex3, uv1), texture2D(tex4, uv1), texBlend);
// } else if(currentTexture == 2) {
// color1 = mix(texture2D(tex4, uv1), texture2D(tex5, uv1), texBlend);
// } else if(currentTexture == 3) {
// color1 = mix(texture2D(tex5, uv1), texture2D(tex6, uv1), texBlend);
// } else if(currentTexture == 4) {
// color1 = mix(texture2D(tex6, uv1), texture2D(tex7, uv1), texBlend);
// } else if(currentTexture == 5) {
// color1 = mix(texture2D(tex7, uv1), texture2D(tex8, uv1), texBlend);
// } else if(currentTexture == 6) {
// color1 = mix(texture2D(tex8, uv1), texture2D(tex1, uv1), texBlend);
// } else {
// color1 = texture2D(tex3, uv1);
// }
// }
// vec4 color2;
// if(distance < radius) {
// color2 = texture2D(tex2, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 360.0) {
// color2 = texture2D(tex2, uv2);
// } else {
//                 // color2 = texture2D(tex4, uv2);
// color2 = mix(texture2D(tex2, uv2), texture2D(tex3, uv2), texBlend);
// }
// } else if(currentTexture == 0) {
// color2 = mix(texture2D(tex2, uv2), texture2D(tex3, uv2), texBlend);
// } else if(currentTexture == 1) {
// color2 = mix(texture2D(tex3, uv2), texture2D(tex4, uv2), texBlend);
// } else if(currentTexture == 2) {
// color2 = mix(texture2D(tex4, uv2), texture2D(tex5, uv2), texBlend);
// } else if(currentTexture == 3) {
// color2 = mix(texture2D(tex5, uv2), texture2D(tex6, uv2), texBlend);
// } else if(currentTexture == 4) {
// color2 = mix(texture2D(tex6, uv2), texture2D(tex7, uv2), texBlend);
// } else if(currentTexture == 5) {
// color2 = mix(texture2D(tex7, uv2), texture2D(tex8, uv2), texBlend);
// } else if(currentTexture == 6) {
// color2 = mix(texture2D(tex8, uv2), texture2D(tex1, uv2), texBlend);
// } else {
// color2 = texture2D(tex2, uv2);
// }
// }
// vec4 color3;
// if(distance < radius) {
// color3 = texture2D(tex2, zoomedUv2);
// } else {
// if(distance < radius1) {
// if(angle >= 0.0 && angle < uProgress * 90.0) {
// color3 = texture2D(tex2, uv3);
// } else {
// color3 = mix(texture2D(tex2, uv3), texture2D(tex3, uv3), texBlend);
// }
// } else if(currentTexture == 0) {
// color3 = mix(texture2D(tex2, uv3), texture2D(tex3, uv3), texBlend);
// } else if(currentTexture == 1) {
// color3 = mix(texture2D(tex3, uv3), texture2D(tex4, uv3), texBlend);
// } else if(currentTexture == 2) {
// color3 = mix(texture2D(tex4, uv3), texture2D(tex5, uv3), texBlend);
// } else if(currentTexture == 3) {
// color3 = mix(texture2D(tex5, uv3), texture2D(tex6, uv3), texBlend);
// } else if(currentTexture == 4) {
// color3 = mix(texture2D(tex6, uv3), texture2D(tex7, uv3), texBlend);
// } else if(currentTexture == 5) {
// color3 = mix(texture2D(tex7, uv3), texture2D(tex8, uv3), texBlend);
// } else if(currentTexture == 6) {
// color3 = mix(texture2D(tex8, uv3), texture2D(tex1, uv3), texBlend);
// } else {
// color3 = texture2D(tex2, uv3);
// }
// }
// vec4 c = mix(color, color1, step(0.5, vUv.x));
// vec4 d = mix(color2, color3, step(0.5, vUv.x));
// vec4 e = mix(c, d, step(0.5, vUv.y));
// gl_FragColor = e;
// }
// if(uIndex == 3.0) {
// gl_FragColor = texture2D(tex2, zoomedUv3);
// }
// }




// god say under copy
// varying vec2 vUv;
// uniform vec4 uResolution;
// uniform sampler2D textures[8]; // テクスチャを配列に格納

// uniform float radius;
// uniform float radius1;

// uniform float xOffset;
// uniform float yOffset;
// uniform float uRaito;

// uniform float uProgress;
// uniform float uTick;
// uniform float uIndex;

// #pragma glslify: coverUv = require(../shader-helper/coverUv);
// #pragma glslify: zoomUv2 = require(../shader-helper/zoomUv2);
// #pragma glslify: zoomUv3 = require(../shader-helper/zoomUv3);
// #pragma glslify: panUv = require(../shader-helper/panUv);
// #pragma glslify: panUv1 = require(../shader-helper/panUv1);
// #pragma glslify: panUv2 = require(../shader-helper/panUv2);
// #pragma glslify: panUv3 = require(../shader-helper/panUv3);
// #pragma glslify: distanceFromCenter = require(../shader-helper/distanceFromCenter);
// #pragma glslify: calculateAngle = require(../shader-helper/calculateAngle);

// void main() {
//     float distance = distanceFromCenter(vUv, uResolution);
//     // Common variables
//     vec2 u = coverUv(vUv, uResolution);
//     vec2 zoomedUv2 = zoomUv2(vUv, uResolution, uProgress, uTick, uRaito);
//     vec2 zoomedUv3 = zoomUv3(vUv, uResolution, uProgress, uTick, uRaito);

//     // 4 pan transitions
//     vec2 uv = panUv(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
//     vec2 uv1 = panUv1(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
//     vec2 uv2 = panUv2(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);
//     vec2 uv3 = panUv3(vUv, uResolution, uProgress, uTick, xOffset, yOffset, uRaito);

//     // 7テクスチャのインデックス
//     int currentTexture = int(uProgress * 7.0);
//     float texBlend = fract(uProgress * 7.0);
    
//     // 選択されたテクスチャを取得
//     sampler2D currentTex = textures[textureIndex];

//     // テクスチャ選択用の条件分岐
//     if (uIndex < 2.0) {
//         // テクスチャの選択とブレンド
//         vec4 color;
//         if (distance < radius) {
//             color = texture2D(currentTex, zoomedUv2);
//         } else {
//             // アングルの計算
//             float angle = calculateAngle(uv, uProgress);
//             if (distance < radius1) {
//                 if (angle >= 0.0 && angle < uProgress * 270.0) {
//                     color = texture2D(currentTex, uv);
//                 } else {
//                     color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1], uv), texBlend);
//                 }
//             } else {
//                 color = mix(texture2D(currentTex, uv), texture2D(textures[textureIndex + 1], uv), texBlend);
//             }
//         }

//         // 同様の処理を繰り返す（color1, color2, color3）
//         // ...
        
//         // 色の合成
//         vec4 c = mix(color, color1, step(0.5, vUv.x));
//         vec4 d = mix(color2, color3, step(0.5, vUv.x));
//         vec4 e = mix(c, d, step(0.5, vUv.y));
//         gl_FragColor = e;
//     } else if (uIndex == 2.0) {
//         // テクスチャの選択とブレンド（uIndex == 2.0 の場合）
//         // 同様の処理を繰り返す
//         // ...
//         // 選択したテクスチャを使用して gl_FragColor を設定
//     } else if (uIndex == 3.0) {
//         // テクスチャの選択とブレンド（uIndex == 3.0 の場合）
//         // 同様の処理を繰り返す
//         // ...
//         // 選択したテクスチャを使用して gl_FragColor を設定
//     }
// }

