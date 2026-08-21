import * as THREE from "three";

const vertexShader = /* glsl */ `
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uTime;
uniform float uSnap;
uniform float uWobble;
uniform vec3 uWarmDir;

out vec2 vUv;
out float vBand;

void main() {
  vec3 pos = position;
  float wave = sin(uTime * 2.6 + position.x * 6.4 + position.y * 5.1 + position.z * 4.2);
  pos += normal * wave * uWobble;

  vec4 clip = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  float w = max(abs(clip.w), 0.0001);
  vec3 ndc = clip.xyz / w;
  float snap = max(uSnap, 8.0);
  ndc.xy = floor(ndc.xy * snap + 0.5) / snap;
  gl_Position = vec4(ndc * w, clip.w);

  vUv = uv;
  vec3 n = normalize(normalMatrix * normal);
  float ndotl = clamp(dot(n, normalize(uWarmDir)), 0.0, 1.0);
  vBand = floor(ndotl * 3.0 + 0.35) / 3.0;
}
`;

const fragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uMap;
uniform vec3 uColor;
uniform float uHasMap;
uniform vec3 uWarmColor;
uniform vec3 uCoolColor;
uniform vec3 uEmissive;

in vec2 vUv;
in float vBand;

out vec4 fragColor;

void main() {
  vec3 texel = vec3(1.0);
  if (uHasMap > 0.5) {
    texel = texture(uMap, vUv).rgb;
  }
  vec3 shade = mix(uCoolColor, uWarmColor, vBand);
  fragColor = vec4(texel * uColor * shade + uEmissive, 1.0);
}
`;

const ticking = [];

const WARM_DIR = new THREE.Vector3(-0.88, 0.28, 0.22).normalize();
const WARM_COLOR = new THREE.Color(0xf89d09);
const COOL_COLOR = new THREE.Color(0x2b2b5d);

export function createPS1Material({
  map = null,
  color = "#ffffff",
  wobble = 0.018,
  emissive = "#000000",
  side = THREE.FrontSide,
} = {}) {
  const material = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: {
      uMap: { value: map },
      uHasMap: { value: map ? 1 : 0 },
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uSnap: { value: 168 },
      uWobble: { value: wobble },
      uWarmDir: { value: WARM_DIR.clone() },
      uWarmColor: { value: WARM_COLOR.clone() },
      uCoolColor: { value: COOL_COLOR.clone() },
      uEmissive: { value: new THREE.Color(emissive) },
    },
    vertexShader,
    fragmentShader,
    side,
  });
  material.userData.baseWobble = wobble;
  material.userData.baseEmissive = material.uniforms.uEmissive.value.clone();
  ticking.push(material);
  return material;
}

export function tickPS1Materials(time, { wobble = true, snap = 168 } = {}) {
  for (const material of ticking) {
    material.uniforms.uTime.value = time;
    material.uniforms.uWobble.value = wobble ? material.userData.baseWobble ?? 0.018 : 0;
    material.uniforms.uSnap.value = snap;
  }
}

export function pulseEmissive(material, amount) {
  const base = material.userData.baseEmissive;
  if (!base) return;
  material.uniforms.uEmissive.value.copy(base).multiplyScalar(amount);
}

export function rememberWobble(material, amount) {
  material.userData.baseWobble = amount;
}
