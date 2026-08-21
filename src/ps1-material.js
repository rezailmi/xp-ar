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
uniform vec3 uLightDir;

out vec2 vUv;
out float vShade;

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
  vShade = clamp(dot(n, normalize(uLightDir)) * 0.5 + 0.58, 0.4, 1.18);
}
`;

const fragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uMap;
uniform vec3 uColor;
uniform float uHasMap;

in vec2 vUv;
in float vShade;

out vec4 fragColor;

void main() {
  vec3 texel = vec3(1.0);
  if (uHasMap > 0.5) {
    texel = texture(uMap, vUv).rgb;
  }
  fragColor = vec4(texel * uColor * vShade, 1.0);
}
`;

const ticking = [];

export function createPS1Material({
  map = null,
  color = "#ffffff",
  wobble = 0.018,
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
      uLightDir: { value: new THREE.Vector3(-0.85, 0.55, 0.2).normalize() },
    },
    vertexShader,
    fragmentShader,
  });
  material.userData.baseWobble = wobble;
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

export function rememberWobble(material, amount) {
  material.userData.baseWobble = amount;
}
