precision mediump float;

uniform float uProgress;
varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

attribute vec3 aDelay2;
varying vec3 vDelay2;

void main() {
    vUv = uv;
    vDelay = aDelay;

    vec3 pos = position;
    // float progress =uProgress;
    float c = sin(aDelay * tan(aDelay * 1.4));
    float progress = clamp(uProgress * 1.3 - c * 0.3, 0.0, 1.0);
    // float progress = sin(uProgress*1.3 - aDelay * 0.3);
    float fpro = progress;

    float a = 5.0;//揺らぎの速さです。サインカーブの周期が増えます。
    float b = 60.0;//揺らぎの大きさです。サインカーブの振幅が増えます。
    pos.x += sin(progress * 3.14) * 20.0;
    // pos.x += sin((progress, 0.1, 0.4) * 3.14) * 20.0;
    pos.y += sin(progress * 3.14) * 50.0;
    pos.z = cos(progress * 3.14 * a) * b;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

