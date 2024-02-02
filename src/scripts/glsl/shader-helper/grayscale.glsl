vec4 grayscale(vec4 tex) {
    vec3 gray = vec3(0.299, 0.587, 0.114);
    float grayScale = dot(tex.rgb, gray);
    return vec4(grayScale, grayScale, grayScale, tex.a);
}

#pragma glslify: export(grayscale)