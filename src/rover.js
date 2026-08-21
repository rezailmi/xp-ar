import * as THREE from "three";
import { createPS1Material, rememberWobble } from "./ps1-material.js";
import { furTexture } from "./textures.js";

export function createRover() {
  const group = new THREE.Group();
  group.name = "Rover";

  const fur = furTexture();
  const furMat = createPS1Material({ map: fur, color: "#D4B24A", wobble: 0.02 });
  const darkFur = createPS1Material({ color: "#5A3E14", wobble: 0.016 });
  const noseMat = createPS1Material({ color: "#111111", wobble: 0.01 });
  const eyeMat = createPS1Material({ color: "#1A1208", wobble: 0.01 });
  const collarMat = createPS1Material({ color: "#3A6EA5", wobble: 0.012 });
  const tagMat = createPS1Material({ color: "#C5A030", wobble: 0.01 });
  rememberWobble(furMat, 0.02);
  rememberWobble(darkFur, 0.016);
  rememberWobble(noseMat, 0.01);
  rememberWobble(eyeMat, 0.01);
  rememberWobble(collarMat, 0.012);
  rememberWobble(tagMat, 0.01);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.4, 0.82), furMat);
  body.position.set(0, 0.64, 0);
  group.add(body);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.34, 0.28), furMat);
  chest.position.set(0, 0.62, 0.42);
  group.add(chest);

  const hip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.28), furMat);
  hip.position.set(0, 0.62, -0.36);
  group.add(hip);

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.2), furMat);
  neck.position.set(0, 0.86, 0.5);
  group.add(neck);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.34), furMat);
  head.position.set(0, 1.02, 0.58);
  group.add(head);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.26), furMat);
  snout.position.set(0, 0.92, 0.82);
  group.add(snout);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.08), noseMat);
  nose.position.set(0, 0.94, 0.96);
  group.add(nose);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.05), eyeMat);
  leftEye.position.set(-0.1, 1.06, 0.74);
  const rightEye = leftEye.clone();
  rightEye.position.x = 0.1;
  group.add(leftEye, rightEye);

  const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.08), darkFur);
  leftEar.position.set(-0.22, 1.04, 0.52);
  leftEar.rotation.z = 0.45;
  const rightEar = leftEar.clone();
  rightEar.position.x = 0.22;
  rightEar.rotation.z = -0.45;
  group.add(leftEar, rightEar);

  const collar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.07, 0.22), collarMat);
  collar.position.set(0, 0.82, 0.5);
  group.add(collar);

  const tag = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.02), tagMat);
  tag.position.set(0.08, 0.76, 0.6);
  group.add(tag);

  const legGeo = new THREE.BoxGeometry(0.12, 0.42, 0.12);
  const legs = [
    [-0.16, 0.22, 0.28],
    [0.16, 0.22, 0.28],
    [-0.16, 0.22, -0.3],
    [0.16, 0.22, -0.3],
  ];
  for (const [x, y, z] of legs) {
    const leg = new THREE.Mesh(legGeo, furMat);
    leg.position.set(x, y, z);
    group.add(leg);
  }

  const pawGeo = new THREE.BoxGeometry(0.14, 0.08, 0.16);
  const paws = [
    [-0.16, 0.04, 0.32],
    [0.16, 0.04, 0.32],
    [-0.16, 0.04, -0.26],
    [0.16, 0.04, -0.26],
  ];
  for (const [x, y, z] of paws) {
    const paw = new THREE.Mesh(pawGeo, darkFur);
    paw.position.set(x, y, z);
    group.add(paw);
  }

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.36), furMat);
  tail.position.set(0.05, 0.78, -0.58);
  tail.rotation.x = 0.35;
  tail.rotation.z = 0.2;
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.48, 10),
    new THREE.MeshBasicMaterial({
      color: 0x1a3310,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  group.userData.tail = tail;
  group.userData.head = head;
  group.userData.baseY = 0;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      group.position.y = group.userData.baseY;
      tail.rotation.z = 0.2;
      head.rotation.y = 0;
      return;
    }
    group.position.y = group.userData.baseY + Math.sin(time * 2.1) * 0.028;
    tail.rotation.z = 0.2 + Math.sin(time * 6.2) * 0.35;
    head.rotation.y = Math.sin(time * 0.7) * 0.08;
  };

  return group;
}
