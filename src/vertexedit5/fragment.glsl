precision mediump float;

varying float v;
varying float v1;

uniform sampler2D uTex;
uniform sampler2D uTex1;
varying vec2 vUv;
varying vec3 pos;

void main() {

    vec2 uv = vUv;
    vec3 p = pos * v;
    vec3 p1 = pos * v1;
    vec2 uc = clamp(uv, 0.2, 0.8);
    vec4 tex = texture2D(uTex, uv);
    vec4 tex1 = texture2D(uTex1, uv);
    gl_FragColor = tex;
}
    // gl_FragColor = vec4(tex.rgb * tex1.rgb, 1.0);
        // gl_DepthRangeParameters = vec3(0.0, 1.0, 0.0);
