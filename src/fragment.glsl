precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform mediump float uTick; // Use mediump precision for uTick

// Function to convert hue, saturation, and lightness to RGB color
vec3 hsl(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
    float m = l - c * 0.5;

    if (h < 1.0 / 6.0) return vec3(c + m, x + m, m);
    else if (h < 2.0 / 6.0) return vec3(x + m, c + m, m);
    else if (h < 3.0 / 6.0) return vec3(m, c + m, x + m);
    else if (h < 4.0 / 6.0) return vec3(m, x + m, c + m);
    else if (h < 5.0 / 6.0) return vec3(x + m, m, c + m);
    else return vec3(c + m, m, x + m);
}

void main() {
    float time = uTick * 0.001;
    float hue = mod(vUv.x - time, 0.9); // Ensure hue is in the range [0, 1]
    vec3 rgb = hsl(hue, 1.0, 0.5);
    vec4 texColor = texture(uTex, vUv);

    // Apply the color effect by combining rgb and texColor
    vec3 modifiedColor = vec3(rgb.r, texColor.g, texColor.b);
    gl_FragColor = vec4(modifiedColor, texColor.a * (1.0 - vDelay)); // Reduce alpha based on vDelay

    // 遅くする場合は以下のようにしても試してみてください
    // gl_FragColor = vec4(modifiedColor, texColor.a * (1.0 - vDelay) * 0.5); // 透明度を半分にする場合
}