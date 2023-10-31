varying vec2 vUv;

uniform float uRadius;
uniform float uSlideIndex;
uniform float uSlideTotal;
uniform float uActiveIndex;
uniform float uTick;
varying float vDistanceProgress;

varying float vScaleProgress;

void main() {
    vUv = uv;

    vec3 pos = position;

    float distanceFrequency = 2.0 * PI / uSlideTotal * (uActiveIndex + uSlideIndex);
    float distanceAngle = mod(distanceFrequency, PI * 2.0);

    pos.x -= 100.0 * sin(distanceFrequency);
    pos.y += 100.0 * sin(distanceFrequency);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}