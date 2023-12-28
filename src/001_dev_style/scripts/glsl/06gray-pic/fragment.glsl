varying vec2 vUv;
uniform vec2 uMouse;
uniform vec4 uResolution;
uniform float uHover;
uniform float uTest;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;

#pragma glslify: grayscale = require(../shader-helper/grayscale);
#pragma glslify: coverUv = require(../shader-helper/coverUv);

void main() {
          // vec2 mouse = step(uMouse, vUv);
          // gl_FragColor = vec4(mouse, uHover, 1.);

    vec2 uv = coverUv(vUv, uResolution);

    vec4 t1 = texture2D(tex1, uv);
    vec4 t2 = texture2D(tex2, uv);
    vec4 t3 = texture2D(tex3, uv);
    vec4 t4 = texture2D(tex4, uv);
    vec4 color = mix(t1, t2, step(.5, uv.x));
    vec4 color2 = mix(t3, t4, step(.5, uv.x));

    vec4 color3 = mix(color, color2, step(.5, uv.y));
    // vec4 gray = vec4 grayscale(color);
    // vec4 gray = grayscale(color);
    // gl_FragColor = gray;
    vec4 gray = grayscale(color3);

    // vec4 h = mix(gray, color, uHover);
    // gl_FragColor = h;
    // gl_FragColor = color3;
    vec4 gray3 = mix(gray, color3, uHover);
    gl_FragColor = gray3;

    gl_FragColor = t1;
}