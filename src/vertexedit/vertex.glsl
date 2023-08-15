varying vec2 vUv;
varying float vExpandTime;
attribute float aExpandTime;
uniform float uProgress;

#pragma glslify: ease = require(glsl-easings/sine-in-out)

void main() {
    vUv = uv;
    vExpandTime = aExpandTime;
    vec3 pos = position;

    // 調整可能な遅延係数
    float delayFactor = 0.01; // 遅延係数を調整してください

    // uProgress を速くすることで遅延を減少させる
    float fastProgress = uProgress * 1.1;

    // 遅延を調整した progress を計算
    float adjustedProgress = ease(clamp(fastProgress * (1.0 + aExpandTime * delayFactor), 0.0, 1.0));

    // 調整した progress に基づいて位置を変更
    pos.z += adjustedProgress * -10.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
