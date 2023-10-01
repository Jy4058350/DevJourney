precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D tex1;
uniform float uProgress;
uniform float uSaturation;
uniform float uBrightness;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

    if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
        discard;
    }
    vec4 tex = texture(tex1, gl_PointCoord);

  // gl_FragColor = vec4(vDelay, 0., 0., 1.);
    gl_FragColor = tex;

    // vec3 rgb = hsl2rgb(vec3(vDelay, 1., 0.5));
    vec3 rgb = hsl2rgb(vec3(vDelay, uSaturation, uBrightness));
    gl_FragColor = vec4(vDelay, 0., 0., 1.);
    gl_FragColor = vec4(rgb, 1.);
}