varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);//クリップ座標系に変換　−１〜１の範囲に収める
}