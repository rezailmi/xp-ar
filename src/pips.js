import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import {
  bookCoverTexture,
  pipsSkinTexture,
  pipsSlipperTexture,
  pipsTuftTexture,
  pipsVestTexture,
} from "./textures.js";

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

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.26), skinMat);
  hips.position.set(0, 0.06, 0.04);
  group.add(hips);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.22), skinMat);
  torso.position.set(0, 0.16, -0.04);
  torso.rotation.x = 0.55;
  group.add(torso);

  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.24), vestMat);
  vest.position.set(0, 0.15, -0.03);
  vest.rotation.x = 0.55;
  group.add(vest);

  const belly = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.08), bellyMat);
  belly.position.set(0, 0.1, 0.1);
  group.add(belly);

  const head = new THREE.Group();
  head.position.set(0, 0.28, 0.12);
  head.rotation.x = 0.15;
  group.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.3), skinMat);
  head.add(skull);

  const cheekL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.07), skinMat);
  cheekL.position.set(-0.17, -0.04, 0.1);
  const cheekR = cheekL.clone();
  cheekR.position.x = 0.17;
  head.add(cheekL, cheekR);

  const tuft = new THREE.Group();
  tuft.position.set(-0.02, 0.18, 0);
  const tuftA = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.1), tuftMat);
  tuftA.rotation.z = 0.4;
  const tuftB = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.08), tuftMat);
  tuftB.position.set(-0.1, 0.08, 0.01);
  tuftB.rotation.z = 0.85;
  const tuftC = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.06), tuftMat);
  tuftC.position.set(-0.16, 0.12, 0);
  tuftC.rotation.z = 1.1;
  tuft.add(tuftA, tuftB, tuftC);
  head.add(tuft);

  const socketL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.03), bellyMat);
  socketL.position.set(-0.08, 0.02, 0.15);
  const socketR = socketL.clone();
  socketR.position.x = 0.08;
  head.add(socketL, socketR);

  const browL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.035, 0.04), lidMat);
  browL.position.set(-0.08, 0.04, 0.155);
  const browR = browL.clone();
  browR.position.x = 0.08;
  head.add(browL, browR);

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.02, 0.03), pupilMat);
  eyeL.position.set(-0.08, 0.008, 0.162);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.08;
  head.add(eyeL, eyeR);

  const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.02, 0.02), pupilMat);
  pupilL.position.set(-0.075, 0.006, 0.175);
  const pupilR = pupilL.clone();
  pupilR.position.x = 0.085;
  head.add(pupilL, pupilR);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.05), noseMat);
  nose.position.set(0, -0.04, 0.16);
  head.add(nose);

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.02, 0.02), mouthMat);
  mouth.position.set(0, -0.1, 0.15);
  head.add(mouth);

  const armL = new THREE.Group();
  armL.position.set(-0.2, 0.12, 0.08);
  const armR = new THREE.Group();
  armR.position.set(0.2, 0.12, 0.08);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), skinMat);
  upper.position.set(0, -0.05, 0);
  const mittL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), skinMat);
  mittL.position.set(0, -0.14, 0.04);
  const mittR = mittL.clone();
  armL.add(upper.clone(), mittL);
  armR.add(upper, mittR);
  armL.rotation.set(1.15, 0.15, 0.55);
  armR.rotation.set(1.05, -0.1, -0.45);
  group.add(armL, armR);

  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.03, 0.12),
    createPS1Material({ map: bookCoverTexture(), color: "#ffffff", wobble: 0.004 }),
  );
  book.position.set(0.02, 0.12, 0.16);
  book.rotation.x = 0.35;
  group.add(book);

  const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.28), skinMat);
  thighL.position.set(-0.1, 0.05, 0.28);
  const thighR = thighL.clone();
  thighR.position.x = 0.1;
  group.add(thighL, thighR);

  const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.22), skinMat);
  shinL.position.set(-0.1, 0.05, 0.5);
  const shinR = shinL.clone();
  shinR.position.x = 0.1;
  group.add(shinL, shinR);

  const slipperL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.14), slipperMat);
  slipperL.position.set(-0.1, 0.04, 0.64);
  const slipperR = slipperL.clone();
  slipperR.position.x = 0.1;
  group.add(slipperL, slipperR);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.1), tuftMat);
  tail.position.set(0, 0.04, -0.14);
  tail.rotation.x = 0.2;
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.28, 8),
    new THREE.MeshBasicMaterial({
      color: 0x0a0814,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.01, 0.18);
  group.add(shadow);

  const torsoY = torso.position.y;
  const vestY = vest.position.y;
  const headY = head.position.y;
  const bookY = book.position.y;

  group.userData.head = head;
  group.userData.armL = armL;
  group.userData.armR = armR;
  group.userData.mouth = mouth;
  group.userData.pupilL = pupilL;
  group.userData.pupilR = pupilR;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      armL.rotation.set(1.15, 0.15, 0.55);
      armR.rotation.set(1.05, -0.1, -0.45);
      head.rotation.set(0.15, 0, 0);
      torso.position.y = torsoY;
      vest.position.y = vestY;
      head.position.y = headY;
      book.position.y = bookY;
      tuft.rotation.z = 0;
      tail.rotation.x = 0.2;
      mouth.scale.y = 1;
      pupilL.position.x = -0.075;
      pupilR.position.x = 0.085;
      return;
    }

    const breath = Math.sin(time * 1.15) * 0.008;
    torso.position.y = torsoY + breath;
    vest.position.y = vestY + breath;
    belly.position.y = 0.1 + breath * 0.5;
    head.position.y = headY + breath * 0.45;
    book.position.y = bookY + breath * 0.4;

    const cycle = time % 12;
    const glance = cycle < 2 ? Math.sin(time * 1.6) * 0.12 : cycle >= 8 && cycle < 9.2 ? -0.16 : 0;
    const doze = cycle >= 4.5 && cycle < 7;
    head.rotation.y = glance;
    head.rotation.x = 0.15 + (doze ? 0.12 : Math.sin(time * 0.9) * 0.03);
    tuft.rotation.z = Math.sin(time * 2.2) * 0.07;
    tail.rotation.x = 0.2 + (cycle >= 10.2 && cycle < 10.5 ? Math.sin(time * 18) * 0.22 : 0);

    const bounce = cycle >= 11 && cycle < 11.45 ? Math.abs(Math.sin(time * 7)) * 0.012 : 0;
    group.position.y = group.userData.seatY + bounce;

    armL.rotation.x = 1.15 + Math.sin(time * 1.1) * 0.04;
    armR.rotation.x = 1.05 + Math.sin(time * 1.1 + 0.6) * 0.035;
    book.rotation.z = Math.sin(time * 0.8) * 0.04;

    mouth.scale.y = doze ? 0.6 : cycle >= 2.4 && cycle < 2.7 ? 1.6 : 1;
    pupilL.position.x = -0.075 + glance * 0.02;
    pupilR.position.x = 0.085 + glance * 0.02;
  };

  return group;
}
