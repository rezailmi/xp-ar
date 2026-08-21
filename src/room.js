import * as THREE from "three";
import { createPS1Material, rememberWobble } from "./ps1-material.js";
import { crtTexture, grassTexture, plasticTexture, woodTexture } from "./textures.js";

export function createRoom() {
  const room = new THREE.Group();
  room.name = "Yard";

  const grass = grassTexture();
  grass.wrapS = THREE.RepeatWrapping;
  grass.wrapT = THREE.RepeatWrapping;
  grass.repeat.set(10, 10);

  const groundMat = createPS1Material({ map: grass, color: "#d8d8d8", wobble: 0.01 });
  rememberWobble(groundMat, 0.01);

  const groundGeo = new THREE.PlaneGeometry(90, 90, 10, 10);
  groundGeo.rotateX(-Math.PI / 2);
  const pos = groundGeo.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const hillA = Math.exp(-(x + 16) ** 2 / 90 - (z + 24) ** 2 / 110) * 7.4;
    const hillB = Math.exp(-(x - 22) ** 2 / 140 - (z + 28) ** 2 / 160) * 4.8;
    const hillC = Math.exp(-(x + 4) ** 2 / 220 - (z + 36) ** 2 / 180) * 3.2;
    pos.setY(i, hillA + hillB + hillC);
  }
  groundGeo.computeVertexNormals();

  const ground = new THREE.Mesh(groundGeo, groundMat);
  room.add(ground);

  const farHill = createPS1Material({ color: "#3B7A2A", wobble: 0.012 });
  const nearHill = createPS1Material({ color: "#6B9B3A", wobble: 0.012 });
  rememberWobble(farHill, 0.012);
  rememberWobble(nearHill, 0.012);

  const moundA = new THREE.Mesh(new THREE.SphereGeometry(7.5, 6, 4), farHill);
  moundA.scale.set(1.8, 0.55, 1.2);
  moundA.position.set(-16, 1.4, -26);
  room.add(moundA);

  const moundB = new THREE.Mesh(new THREE.SphereGeometry(5.2, 6, 4), nearHill);
  moundB.scale.set(1.6, 0.5, 1.3);
  moundB.position.set(18, 0.9, -30);
  room.add(moundB);

  room.add(createCrate(-2.15, 0, -0.35));
  room.add(createCrt(-2.15, 0.52, -0.35));

  return room;
}

function createCrate(x, y, z) {
  const mat = createPS1Material({ map: woodTexture(), color: "#ffffff", wobble: 0.014 });
  rememberWobble(mat, 0.014);
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), mat);
  crate.position.set(x, y + 0.35, z);
  crate.rotation.y = 0.18;
  return crate;
}

function createCrt(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = 0.35;

  const beige = createPS1Material({ map: plasticTexture(), color: "#ffffff", wobble: 0.01 });
  const dark = createPS1Material({ color: "#2A2A28", wobble: 0.008 });
  rememberWobble(beige, 0.01);
  rememberWobble(dark, 0.008);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.48), beige);
  body.position.y = 0.28;
  group.add(body);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.06), dark);
  bezel.position.set(0, 0.3, 0.24);
  group.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.3),
    createPS1Material({ map: crtTexture(), color: "#ffffff", wobble: 0 }),
  );
  screen.position.set(0, 0.3, 0.275);
  group.add(screen);

  const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.32), beige);
  base.position.y = 0.02;
  group.add(base);

  return group;
}

export function createSky() {
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color("#7EC8E3") },
      uHorizon: { value: new THREE.Color("#C5E4F3") },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vPos;
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      void main() {
        float h = normalize(vPos).y;
        float t = clamp(h * 0.75 + 0.35, 0.0, 1.0);
        gl_FragColor = vec4(mix(uHorizon, uTop, t), 1.0);
      }
    `,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(80, 16, 12), skyMat);
}
