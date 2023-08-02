
    varying vec2 vUv;
    uniform sampler2D uTex;

    void main() {
      vec4 texColor = texture(uTex, vUv);
      gl_FragColor = texColor;

    }
    
    