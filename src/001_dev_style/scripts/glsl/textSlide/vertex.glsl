varying vec2 vUv;

uniform float uRadius;
uniform float uSlideIndex;
uniform float uSlideTotal;
uniform float uActiveIndex;

varying float vDistanceProgress;

void main() {
    vUv = uv;

    vec3 pos = position;

    float activeSlideIndex = mod(uActiveIndex, uSlideTotal);
    float distance = abs(activeSlideIndex - uSlideIndex);
    float depth = uSlideTotal / 2.;

    float distanceProgress = abs(distance - depth) / depth;
    vDistanceProgress = distanceProgress;

    // float scaleProgress = clamp(1. - distanceProgress, 0., 1.);

    // pos.x = pos.x * scaleProgress;
    pos.xy = pos.xy * (0.9 + 0.5 * distanceProgress);

    // float roundZ = uRadius - sqrt(uRadius * uRadius - pos.x * pos.x);
    float roundZ = uRadius - sqrt(pow(uRadius, 2.) - pow(pos.x, 2.));
    pos.z -= roundZ;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}