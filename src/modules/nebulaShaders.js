/**
 * nebulaShaders - Module con shaders GLSL para efectos volumétricos de nebulosa
 * Module pattern: lógica pura de shaders sin dependencias UI
 */

// Vertex shader con distorsión de noise
const volumetricVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader con gradiente radial y noise
const volumetricFragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float time;
  uniform float opacity;
  uniform float noiseScale;
  uniform float pulseSpeed;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Simplex noise 3D simplificado
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    // Distancia del centro (gradiente radial)
    float dist = length(vPosition);
    float normalizedDist = dist / 1.8;
    
    // Noise volumétrico en 3D
    vec3 noiseCoord = vPosition * noiseScale + time * 0.05;
    float noise1 = snoise(noiseCoord);
    float noise2 = snoise(noiseCoord * 2.0 + time * 0.03);
    float noise3 = snoise(noiseCoord * 0.5 - time * 0.02);
    
    // Combinar múltiples octavas de noise
    float turbulence = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
    
    // Pulsación orgánica
    float pulse = sin(time * pulseSpeed + dist * 2.0) * 0.5 + 0.5;
    
    // Gradiente de color basado en distancia + noise
    float colorMix1 = smoothstep(0.0, 0.4, normalizedDist + turbulence * 0.2);
    float colorMix2 = smoothstep(0.4, 1.0, normalizedDist + turbulence * 0.15);
    
    vec3 finalColor = mix(color1, color2, colorMix1);
    finalColor = mix(finalColor, color3, colorMix2);
    
    // Agregar brillo del noise
    finalColor += vec3(turbulence * 0.1);
    
    // Opacidad volumétrica (más denso en el centro)
    float volumeOpacity = (1.0 - normalizedDist) * opacity;
    volumeOpacity *= (0.5 + turbulence * 0.5);
    volumeOpacity *= (0.8 + pulse * 0.2);
    
    // Fresnel para efecto de borde
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    volumeOpacity += fresnel * 0.1;
    
    gl_FragColor = vec4(finalColor, volumeOpacity);
  }
`;

// Shader para partículas con brillo variable
const particleVertexShader = `
  uniform float time;
  uniform float size;
  
  attribute float customSize;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  // Noise simple para variación
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vColor = color;
    
    // Variación de brillo basada en posición + tiempo
    float noise = random(position.xy + time * 0.1);
    float twinkle = sin(time * 2.0 + position.x * 10.0 + position.y * 10.0) * 0.5 + 0.5;
    vAlpha = 0.5 + (noise * 0.3 + twinkle * 0.2);
    
    // Tamaño variable
    float finalSize = size * customSize * (0.8 + twinkle * 0.4);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = finalSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Circular particle con gradiente suave
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Gradiente radial suave
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 2.0);
    
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

// API pública del módulo
export const nebulaShaders = {
  volumetric: {
    vertexShader: volumetricVertexShader,
    fragmentShader: volumetricFragmentShader
  },
  particle: {
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader
  }
};
