// precision mediump float;

// uniform float uProgress;
// varying vec2 vUv;
// varying float vDelay;
// attribute float aDelay;

// void main() {
//     vUv = uv;
//     vDelay = aDelay;
//     vec3 pos = position;
//     // float progress =uProgress;
//     float progress = clamp(uProgress * 1.3 - aDelay * 0.3, 0.0, 1.0);
//     // float progress = sin(uProgress*1.3 - aDelay * 0.3);
//     pos.z = sin(2.0 * progress * 3.14) * 50.0;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }

// precision mediump float;

// uniform float uProgress;
// varying vec2 vUv;
// varying float vDelay;
// attribute float aDelay;
// uniform sampler2D uRandomTexture;

// void main() {
//     vUv = uv;
//     vDelay = aDelay;
//     vec3 pos = position;

//     // Generate a random value for displacement
//     float randomDisplacement = (texture2D(uRandomTexture, vUv).r - 0.5) * 50.0;

//     float progress = clamp(uProgress * 1.3 - aDelay * 0.3, 0.0, 1.0);
//     pos.z = sin(2.0 * progress * 3.14) * 50.0 + randomDisplacement;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }

// precision mediump float;

// uniform float uProgress;
// varying vec2 vUv;
// varying float vDelay;
// attribute float aDelay;

// void main() {
//     vUv = uv;
//     vDelay = aDelay;

//     vec3 pos = position;
//     float progress = clamp(uProgress * 1.3 - aDelay * 0.3, 0.0, 1.0);

//     // Modify the Z position using uProgress to create the desired effect
//     float displacement = sin(2.0 * progress * 3.14) * 50.0;
//     pos.z += displacement;

//     // Determine whether it's the front or back face
//     bool isFrontFace = gl_FrontFacing;
//     if (!isFrontFace) {
//         // Apply different logic for the back face if needed
//         pos.x *= -1.0; // Example: mirror the back face
//     }

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }

precision mediump float;

uniform float uProgress;
varying vec2 vUv;
varying float vDelay;
attribute float aRandom;

void main() {
    vUv = uv;
    vDelay = aRandom;

    vec3 pos = position;
    float progress = clamp(uProgress * 1.3 - aRandom * 0.3, 0.0, 1.0);

    // Modify the Z position using uProgress to create the desired effect
    float displacement = sin(3.0 * progress * 3.14) * progress * 100.0;
    pos.z += displacement;

    // Set gl_Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
