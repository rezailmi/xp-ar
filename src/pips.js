import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import { pipsSkinTexture, pipsSlipperTexture, pipsTuftTexture, pipsVestTexture } from "./textures.js";

export function createPips() {
  const group = new THREE.Group();
  group.name = "Pips";

  const skinMat = createPS1Material({ map: pipsSkinTexture(), color: "#ffffff", wobble: 0.01 });
  const vestMat = createPS1Material({ map: pipsVestTexture(), color: "#ffffff", wobble: 0.008 });
  const tuftMat = createPS1Material({ map: pipsTuftTexture(), color: "#ffffff", wobble: 0.012 });
  const slipperMat = createPS1Material({ map: pipsSlipperTexture(), color: "#ffffff", wobble: 0.006 });
  const lidMat = createPS1Material({ color: "#3A2A22", wobble: 0.006 });
  const pupilMat = createPS1Material({ color: "#111111", wobble: 0.004 });
  const noseMat = createPS1Material({ color: "#8A5A3A", wobble: 0.006 });
  const mouthMat = createPS1Material({ color: "#6A4030", wobble: 0.004 });
  const bellyMat = createPS1Material({ color: "#F0D8B4", wobble: 0.006 });

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.24), skinMat);
  hips.position.set(0, 0.02, 0.02);
  group.add(hips);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2), skinMat);
  torso.position.set(0, 0.17, 0);
  torso.rotation.x = -0.12;
  group.add(torso);

  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.24), vestMat);
  vest.position.set(0, 0.16, 0.01);
  vest.rotation.x = -0.12;
  group.add(vest);

  const belly = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.06), bellyMat);
  belly.position.set(0, 0.1, 0.12);
  group.add(belly);

  const head = new THREE.Group();
  head.position.set(0, 0.38, 0.08);
  group.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.3), skinMat);
  head.add(skull);

  const cheekL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), skinMat);
  cheekL.position.set(-0.16, -0.04, 0.1);
  const cheekR = cheekL.clone();
  cheekR.position.x = 0.16;
  head.add(cheekL, cheekR);

  const tuft = new THREE.Group();
  tuft.position.set(-0.04, 0.16, -0.02);
  const tuftA = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.08), tuftMat);
  tuftA.rotation.z = 0.35;
  const tuftB = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.07), tuftMat);
  tuftB.position.set(-0.07, 0.06, 0);
  tuftB.rotation.z = 0.7;
  tuft.add(tuftA, tuftB);
  head.add(tuft);

  const browL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.04), lidMat);
  browL.position.set(-0.07, 0.05, 0.15);
  const browR = browL.clone();
  browR.position.x = 0.07;
  head.add(browL, browR);

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.03), pupilMat);
  eyeL.position.set(-0.07, 0.015, 0.155);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.07;
  head.add(eyeL, eyeR);

  const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.02), pupilMat);
  pupilL.position.set(-0.065, 0.012, 0.17);
  const pupilR = pupilL.clone();
  pupilR.position.x = 0.075;
  head.add(pupilL, pupilR);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.05), noseMat);
  nose.position.set(0, -0.04, 0.16);
  head.add(nose);

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.02, 0.02), mouthMat);
  mouth.position.set(0, -0.1, 0.15);
  head.add(mouth);

  const armL = new THREE.Group();
  armL.position.set(-0.2, 0.16, 0.06);
  const armR = new THREE.Group();
  armR.position.set(0.2, 0.16, 0.06);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), skinMat);
  upper.position.set(0, -0.05, 0);
  const mittL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), skinMat);
  mittL.position.set(0, -0.14, 0.03);
  const mittR = mittL.clone();
  armL.add(upper.clone(), mittL);
  armR.add(upper, mittR);
  armL.rotation.set(0.95, 0, 0.28);
  armR.rotation.set(0.85, 0, -0.22);
  group.add(armL, armR);

  const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.24), skinMat);
  thighL.position.set(-0.1, -0.01, 0.16);
  const thighR = thighL.clone();
  thighR.position.x = 0.1;
  group.add(thighL, thighR);

  const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.1), skinMat);
  shinL.position.set(-0.1, -0.1, 0.26);
  const shinR = shinL.clone();
  shinR.position.x = 0.1;
  group.add(shinL, shinR);

  const slipperL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.16), slipperMat);
  slipperL.position.set(-0.1, -0.2, 0.3);
  const slipperR = slipperL.clone();
  slipperR.position.x = 0.1;
  group.add(slipperL, slipperR);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.1), tuftMat);
  tail.position.set(0, 0.0, -0.14);
  tail.rotation.x = 0.35;
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 8),
    new THREE.MeshBasicMaterial({
      color: 0x2a2018,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, -0.28, 0.1);
  group.add(shadow);

  const torsoY = torso.position.y;
  const vestY = vest.position.y;
  const headY = head.position.y;

  group.userData.head = head;
  group.userData.armL = armL;
  group.userData.armR = armR;
  group.userData.mouth = mouth;
  group.userData.pupilL = pupilL;
  group.userData.pupilR = pupilR;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      armL.rotation.set(0.95, 0, 0.28);
      armR.rotation.set(0.85, 0, -0.22);
      head.rotation.set(0, 0, 0);
      torso.position.y = torsoY;
      vest.position.y = vestY;
      head.position.y = headY;
      tuft.rotation.z = 0;
      tail.rotation.x = 0.35;
      mouth.scale.y = 1;
      pupilL.position.x = -0.065;
      pupilR.position.x = 0.075;
      return;
    }

    const breath = Math.sin(time * 1.65) * 0.01;
    torso.position.y = torsoY + breath;
    vest.position.y = vestY + breath;
    belly.position.y = 0.1 + breath * 0.6;
    head.position.y = headY + breath * 0.55;

    const cycle = time % 10;
    const glance = cycle < 1.6 ? Math.sin(time * 2.2) * 0.16 : cycle >= 6.8 && cycle < 8 ? -0.2 : 0;
    head.rotation.y = glance;
    head.rotation.x = Math.sin(time * 1.15) * 0.03;
    tuft.rotation.z = Math.sin(time * 2.6) * 0.08;
    tail.rotation.x = 0.35 + (cycle >= 3.8 && cycle < 4.15 ? Math.sin(time * 20) * 0.28 : 0);

    const bounce = cycle >= 8.5 && cycle < 9.15 ? Math.abs(Math.sin(time * 8)) * 0.01 : 0;
    group.position.y = group.userData.seatY + bounce;

    armL.rotation.x = 0.95 + Math.sin(time * 1.4) * 0.05;
    armR.rotation.x = 0.85 + Math.sin(time * 1.4 + 0.7) * 0.04;
    armL.rotation.z = 0.28;
    armR.rotation.z = -0.22;

    mouth.scale.y = cycle >= 5.1 && cycle < 5.5 ? 1.8 : 1;
    pupilL.position.x = -0.065 + glance * 0.025;
    pupilR.position.x = 0.075 + glance * 0.025;
  };

  return group;
}
