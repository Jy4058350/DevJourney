varying vec2 vUv;

uniform float uRadius;
uniform float uSlideIndex;
uniform float uSlideTotal;
uniform float uActiveIndex;
uniform float uTick;
varying float vDistanceAngle;

void main() {
    vUv = uv;

    vec3 pos = position;

    // float distanceFrequency = 2.0 * PI / uSlideTotal * (uActiveIndex + uSlideIndex);
    float distanceFrequency = 2.0 * PI / uSlideTotal * (uActiveIndex + uSlideIndex);//It becomes variable here.
    float distanceAngle = mod(distanceFrequency, 2.0 * PI);
    vDistanceAngle = distanceAngle;

    pos.y += 100.0 * sin(distanceFrequency);
    // pos.y += 100.0 * sin(distanceFrequency);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}