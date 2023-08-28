precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex;
varying vec3 vPos;

void main() {

    vec4 tex = texture2D(uTex, vUv);

    gl_FragColor = vec4(vUv, 0.5, 1.0);
    gl_FragColor = vec4(vPos.x, 0.0 ,0.5, 1.0);

    gl_FragColor = tex;
}

