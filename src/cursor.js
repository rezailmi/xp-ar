import * as THREE from "three";
import { glowTexture } from "./textures.js";

export function createTalkCursor() {
  const group = new THREE.Group();
  group.name = "TalkCursor";

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.16),
    new THREE.MeshBasicMaterial({
      map: glowTexture(),
      color: 0xffe08a,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  group.add(glow);

  const plusH = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.012, 0.012),
    new THREE.MeshBasicMaterial({ color: 0xfff4c0 }),
  );
  const plusV = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.07, 0.012),
    new THREE.MeshBasicMaterial({ color: 0xfff4c0 }),
  );
  group.add(plusH, plusV);

  const speckA = new THREE.Mesh(
    new THREE.BoxGeometry(0.016, 0.016, 0.016),
    new THREE.MeshBasicMaterial({ color: 0x44e878 }),
  );
  speckA.position.set(0.05, 0.03, 0);
  const speckB = speckA.clone();
  speckB.material = new THREE.MeshBasicMaterial({ color: 0xe85a88 });
  speckB.position.set(-0.045, -0.03, 0.01);
  group.add(speckA, speckB);

  group.userData.update = (time, head, reduceMotion) => {
    const origin = head.getWorldPosition(group.userData._head ??= new THREE.Vector3());
    const bob = reduceMotion ? 0 : Math.sin(time * 2.1) * 0.02;
    group.position.set(origin.x + 0.22, origin.y + 0.16 + bob, origin.z + 0.1);
    group.rotation.y = time * 0.6;
    glow.material.opacity = reduceMotion ? 0.4 : 0.4 + Math.sin(time * 3.4) * 0.12;
  };

  return group;
}
