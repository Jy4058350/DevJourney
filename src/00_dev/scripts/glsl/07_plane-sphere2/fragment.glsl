precision mediump float;

varying vec2 vUv;
varying float vDelay;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uTick;
uniform float uColorDelay;
uniform float uHover;
uniform sampler2D tex1;
uniform sampler2D tex2;
varying float vScalar;
varying vec3 vSphereNormal;

#pragma glslify: grayscale = require(../shader-helper/grayscale);
#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {

    vec2 uv = coverUv(vUv, uResolution);

    //texture color
    vec4 tex = texture(tex1, uv);
    vec4 gray = grayscale(tex);
    vec4 texColor = mix(gray, tex, uHover);

    //sphere color
    // vec3 ray = vec3(0.0, 0.0, -1.0);
    // vec3 ray = vec3(0.0, 0.0, 0.5);
    vec3 ray = vec3(cos(uTick * 0.01) * 0.3, sin(uTick * 0.01) * 0.3, 0.5);
    // vec3 ray = vec3(cos(uTick * 0.01), 0.0, sin(uTick * 0.01));
    // float fresnel = dot(ray, vSphereNormal);
    float fresnel = 1.0 - dot(ray, vSphereNormal);
    // vec4 sphereColor = vec4(vec3(fresnel), 1.0 - fresnel);
    vec4 sphereColor = vec4(vec3(fresnel), 0.5);
    vec4 t = vec4(1.0, 0.0, 0.0, 1.0);
    // vec4 b = mix(sphereColor, t, 1.0 - vScalar);
    // vec4 b = mix(sphereColor, t, vScalar);
    vec4 b = mix(sphereColor, t, 0.5);
    vec4 c = grayscale(b);
    vec4 d = mix(c, b, uHover);

    //mix colors
    // vec4 color = mix(sphereColor, texColor, vScalar);
    vec4 color = mix(d, texColor, vScalar);
    gl_FragColor = color;

}