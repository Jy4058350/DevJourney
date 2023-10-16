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

uniform float uProgress;
uniform float uProgress1;
uniform float uTick;
uniform float uIndex;

#pragma glslify: coverUv = require(../shader-helper/coverUv);
#pragma glslify: panUv = require(../shader-helper/panUv);

void main() {

    // vec2 uv = coverUv(vUv, uResolution);
    vec2 uv = panUv(vUv, uResolution, uProgress * uSpeed, uTick);
    //try other slide transitions
    int currentTexture = int(uProgress * 6.0);
    float texBlend = fract(uProgress * 6.0);
    // vec4 try = mix(t1, t2, fract(uProgress * 2.0));

 // Blend between the current and next textures
    vec4 color;
    if(currentTexture == 0) {
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

    gl_FragColor = color;
}