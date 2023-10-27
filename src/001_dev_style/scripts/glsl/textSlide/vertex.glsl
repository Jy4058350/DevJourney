varying vec2 vUv;

uniform float uRadius;
uniform float uSlideIndex;
uniform float uSlideTotal;
uniform float uActiveIndex;

void main() {
    vUv = uv;

    vec3 pos = position;

    float activeSlideIndex = mod(uActiveIndex, uSlideTotal);
    float distance = abs(activeSlideIndex - uSlideIndex);
    float depth = uSlideTotal / 2.;

    float distanceProgress = abs(distance - depth) / depth;
    vDistanceProgress = distanceProgress;  

    float radius = uRadius * distanceProgress;

    pos.y = pos.y * radius;

    pos.x = pos.x * radius;
    


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}