precision lowp float;

#pragma glslify: exponential = require(glsl-easings/exponential-out)


varying vec2 vUv;
attribute float aIntensity;


uniform float uProgress;
varying float vAlpha;

varying float vProgress;

void main() {
    vUv = uv;
    vec3 pos = position;

    const float cameraZ = 1000.;

    float progress = vProgress = 1. - abs(2. * uProgress - 1.);
    float speed = exponential(progress);

    vec2 xyDirection = (uv - 0.5) * 2.0;
    float xyIntensity = 1000.;

    pos.z = speed * aIntensity;
    pos.xy += xyDirection * xyIntensity * pos.z / cameraZ;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.2 * (cameraZ / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = mix(0.1, 1.0, -mvPosition.z/cameraZ);
}