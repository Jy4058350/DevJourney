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

//perfect circle build
    vec2 centerdUv = vUv - vec2(0.5, 0.5);
    float aspectRatio = uResolution.x / uResolution.y;
    centerdUv.x *= aspectRatio;
    float distance = length(centerdUv);
    float radius = 0.2;
    float radius1 = 0.3;

    //Common variables
    vec2 u = coverUv(vUv, uResolution);
    vec2 zoomedUv2 = zoomUv2(vUv, uResolution, uProgress * uSpeed, uTick);
    vec2 center = vec2(0.5, 0.5);

 // 4 pan transitions
    vec2 uv = panUv(vUv, uResolution, uProgress * uSpeed, uTick, xOffset, yOffset);
    vec2 uv1 = panUv1(vUv, uResolution, uProgress * uSpeed, uTick, xOffset, yOffset);
    vec2 uv2 = panUv2(vUv, uResolution, uProgress * uSpeed, uTick, xOffset, yOffset);
    vec2 uv3 = panUv3(vUv, uResolution, uProgress * uSpeed, uTick, xOffset, yOffset);

    //try other slide transitions here 7textures
    int currentTexture = int(uProgress * 7.0);
    float texBlend = fract(uProgress * 7.0);

   //Calculate the angle from the center based on uProgress
    // vec2 center = vec2(0.5, 0.5);
    vec2 delta = uv - center;
    float angle = degrees(atan(delta.x, delta.y));
    float a = uProgress * 90.0;
    float a1 = uProgress * 180.0;
    float a2 = uProgress * 270.0;
    float a3 = uProgress * 360.0;
    angle = mod(angle, 360.0);

 // Blend between the current and next textures
    vec4 color;

    if(distance < radius) {
        color = texture2D(tex1, zoomedUv2);
    } else {
        if(distance < radius1) {
            if(angle >= 0.0 && angle < a2) {
                color = texture2D(tex1, uv);
            } else {
                color = texture2D(tex4, uv);
                color = mix(texture2D(tex1, uv), texture2D(tex2, uv), texBlend);
            }

        } else if(currentTexture == 0) {
            color = mix(texture2D(tex1, uv), texture2D(tex2, uv), texBlend);
        } else if(currentTexture == 1) {
            color = mix(texture2D(tex2, uv), texture2D(tex3, uv), texBlend);
        } else if(currentTexture == 2) {
            color = mix(texture2D(tex3, uv), texture2D(tex4, uv), texBlend);
        } else if(currentTexture == 3) {
            color = mix(texture2D(tex4, uv), texture2D(tex5, uv), texBlend);
        } else if(currentTexture == 4) {
            color = mix(texture2D(tex5, uv), texture2D(tex6, uv), texBlend);
        } else if(currentTexture == 5) {
            color = mix(texture2D(tex6, uv), texture2D(tex7, uv), texBlend);
        } else if(currentTexture == 6) {
            color = mix(texture2D(tex1, uv), texture2D(tex8, uv), texBlend);
        } else {
            color = texture2D(tex1, uv);
        }
    }
    vec4 color1;
    if(distance < radius) {
        color1 = texture2D(tex1, zoomedUv2);
    } else {
        if(distance < radius1) {
            if(angle >= 0.0 && angle < a1) {
                color1 = texture2D(tex1, uv1);
            } else {
                color1 = texture2D(tex4, uv1);
            }
        } else if(currentTexture == 0) {
            color1 = mix(texture2D(tex1, uv1), texture2D(tex2, uv1), texBlend);
        } else if(currentTexture == 1) {
            color1 = mix(texture2D(tex2, uv1), texture2D(tex3, uv1), texBlend);
        } else if(currentTexture == 2) {
            color1 = mix(texture2D(tex3, uv1), texture2D(tex4, uv1), texBlend);
        } else if(currentTexture == 3) {
            color1 = mix(texture2D(tex4, uv1), texture2D(tex5, uv1), texBlend);
        } else if(currentTexture == 4) {
            color1 = mix(texture2D(tex5, uv1), texture2D(tex6, uv1), texBlend);
        } else if(currentTexture == 5) {
            color1 = mix(texture2D(tex6, uv1), texture2D(tex7, uv1), texBlend);
        } else if(currentTexture == 6) {
            color1 = mix(texture2D(tex1, uv1), texture2D(tex8, uv1), texBlend);
        } else {
            color1 = texture2D(tex1, uv1);
        }
    }
    vec4 color2;
    if(distance < radius) {
        color2 = texture2D(tex1, zoomedUv2);
    } else {
        if(distance < radius1) {
            if(angle >= 0.0 && angle < a3) {
                color2 = texture2D(tex1, uv2);
            } else {
                color2 = texture2D(tex4, uv2);
            }
        } else if(currentTexture == 0) {
            color2 = mix(texture2D(tex1, uv2), texture2D(tex2, uv2), texBlend);
        } else if(currentTexture == 1) {
            color2 = mix(texture2D(tex2, uv2), texture2D(tex3, uv2), texBlend);
        } else if(currentTexture == 2) {
            color2 = mix(texture2D(tex3, uv2), texture2D(tex4, uv2), texBlend);
        } else if(currentTexture == 3) {
            color2 = mix(texture2D(tex4, uv2), texture2D(tex5, uv2), texBlend);
        } else if(currentTexture == 4) {
            color2 = mix(texture2D(tex5, uv2), texture2D(tex6, uv2), texBlend);
        } else if(currentTexture == 5) {
            color2 = mix(texture2D(tex6, uv2), texture2D(tex7, uv2), texBlend);
        } else if(currentTexture == 6) {
            color2 = mix(texture2D(tex1, uv2), texture2D(tex8, uv2), texBlend);
        } else {
            color2 = texture2D(tex1, uv2);
        }
    }
    vec4 color3;
    if(distance < radius) {
        color3 = texture2D(tex1, zoomedUv2);
    } else {
        if(distance < radius1) {
            if(angle >= 0.0 && angle < a) {
                color3 = texture2D(tex1, uv3);
            } else {
                color3 = texture2D(tex4, uv3);
            }
        } else if(currentTexture == 0) {
            color3 = mix(texture2D(tex1, uv3), texture2D(tex2, uv3), texBlend);
        } else if(currentTexture == 1) {
            color3 = mix(texture2D(tex2, uv3), texture2D(tex3, uv3), texBlend);
        } else if(currentTexture == 2) {
            color3 = mix(texture2D(tex3, uv3), texture2D(tex4, uv3), texBlend);
        } else if(currentTexture == 3) {
            color3 = mix(texture2D(tex4, uv3), texture2D(tex5, uv3), texBlend);
        } else if(currentTexture == 4) {
            color3 = mix(texture2D(tex5, uv3), texture2D(tex6, uv3), texBlend);
        } else if(currentTexture == 5) {
            color3 = mix(texture2D(tex6, uv3), texture2D(tex7, uv3), texBlend);
        } else if(currentTexture == 6) {
            color3 = mix(texture2D(tex1, uv3), texture2D(tex8, uv3), texBlend);
        } else {
            color3 = texture2D(tex1, uv3);
        }
    }
    vec4 c = mix(color, color1, step(0.5, vUv.x));
    vec4 d = mix(color2, color3, step(0.5, vUv.x));
    vec4 e = mix(c, d, step(0.5, vUv.y));
    gl_FragColor = e;
}