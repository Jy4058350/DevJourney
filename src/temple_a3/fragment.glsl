precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
varying vec3 vPos;
varying vec3 vColor;

void main() {

    // vec4 tex = texture2D(uTex0, vUv);
    // vec4 tex1 = texture2D(uTex1, vUv);

    // gl_FragColor = vec4(vUv, 0.5, 1.0);
    // gl_FragColor = vec4(vPos.x, 0.0 ,0.5, 1.0);

    // gl_FragColor = tex1;
    gl_FragColor = vec4(vColor, 1.);
}

