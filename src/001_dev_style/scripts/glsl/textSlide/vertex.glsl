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

    float radius = cos(uTick * 0.001) * uRadius;

    float activeSlideIndex = mod(uActiveIndex, uSlideTotal);
    float distance = abs(activeSlideIndex - uSlideIndex);
    float depth = uSlideTotal / 2.;

    float distanceProgress = abs(distance - depth) / depth;
    // float distanceProgress = clamp(1. - distance / depth, 0., 1.);
    vDistanceProgress = distanceProgress;

    // float scaleProgress = clamp(1. - distanceProgress, 0., 1.);

    // pos.xy = pos.xy * distanceProgress;
    float scaleProgress = clamp((distanceProgress - 0.8) * 5., 0., 1.);
    pos.xy = pos.xy * (0.8 + 0.3 * scaleProgress);
    vScaleProgress = scaleProgress;

    // float roundZ = uRadius - sqrt(uRadius * uRadius - pos.x * pos.x);
    // float roundZ = uRadius - sqrt(pow(uRadius, 2.) - pow(pos.x, 2.));
    float roundZ = radius - sqrt(pow(radius, 2.) - pow(pos.x, 2.));
    pos.z -= roundZ;

    pos.y += cos(uTick * 0.03) * 10.;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}