import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import { gauntletTexture, pipsFurTexture, sneakerTexture } from "./textures.js";

export function createPips() {
  const group = new THREE.Group();
  group.name = "Pips";

  const furMat = createPS1Material({ map: pipsFurTexture(), color: "#ffffff", wobble: 0.018 });
  const gauntletMat = createPS1Material({ map: gauntletTexture(), color: "#ffffff", wobble: 0.012 });
  const shoeMat = createPS1Material({ map: sneakerTexture(), color: "#ffffff", wobble: 0.01 });
  const eyeWhite = createPS1Material({ color: "#F4EDE0", wobble: 0.008 });
  const pupilMat = createPS1Material({ color: "#111111", wobble: 0.006 });
  const noseMat = createPS1Material({ color: "#4A3B12", wobble: 0.008 });
  const mouthMat = createPS1Material({ color: "#6B4A2A", wobble: 0.006 });

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.2), furMat);
  hips.position.set(0, 0.02, 0);
  group.add(hips);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.26, 0.2), furMat);
  torso.position.set(0, 0.2, 0.01);
  group.add(torso);

  const head = new THREE.Group();
  head.position.set(0, 0.42, 0.04);
  group.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.32), furMat);
  head.add(skull);

  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.06), furMat);
  brow.position.set(0, 0.08, 0.14);
  head.add(brow);

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 0.05), eyeWhite);
  eyeL.position.set(-0.08, 0.02, 0.15);
  const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.15, 0.05), eyeWhite);
  eyeR.position.set(0.09, 0.03, 0.15);
  head.add(eyeL, eyeR);

  const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.03), pupilMat);
  pupilL.position.set(-0.08, 0.01, 0.18);
  const pupilR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.055, 0.03), pupilMat);
  pupilR.position.set(0.1, 0.02, 0.18);
  head.add(pupilL, pupilR);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.05), noseMat);
  nose.position.set(0, -0.06, 0.17);
  head.add(nose);

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.03), mouthMat);
  mouth.position.set(0, -0.12, 0.15);
  head.add(mouth);

  const earL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.1, 0.06), furMat);
  earL.position.set(-0.2, 0.1, -0.02);
  const earR = earL.clone();
  earR.position.x = 0.2;
  head.add(earL, earR);

  const armL = new THREE.Group();
  armL.position.set(-0.2, 0.18, 0.04);
  const armR = new THREE.Group();
  armR.position.set(0.2, 0.18, 0.04);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), furMat);
  upper.position.set(0, -0.05, 0);
  const gloveL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), gauntletMat);
  gloveL.position.set(0, -0.16, 0.04);
  const gloveR = gloveL.clone();
  armL.add(upper.clone(), gloveL);
  armR.add(upper, gloveR);
  armL.rotation.z = 0.35;
  armR.rotation.z = -0.35;
  group.add(armL, armR);

  const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.22), furMat);
  thighL.position.set(-0.08, -0.02, 0.14);
  const thighR = thighL.clone();
  thighR.position.x = 0.08;
  group.add(thighL, thighR);

  const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.2, 0.09), furMat);
  shinL.position.set(-0.08, -0.14, 0.22);
  const shinR = shinL.clone();
  shinR.position.x = 0.08;
  group.add(shinL, shinR);

  const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.2), shoeMat);
  shoeL.position.set(-0.08, -0.26, 0.26);
  const shoeR = shoeL.clone();
  shoeR.position.x = 0.08;
  group.add(shoeL, shoeR);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.22, 8),
    new THREE.MeshBasicMaterial({
      color: 0x2a1810,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, -0.4, 0.12);
  group.add(shadow);

  group.userData.head = head;
  group.userData.armL = armL;
  group.userData.armR = armR;
  group.userData.mouth = mouth;
  group.userData.pupilL = pupilL;
  group.userData.pupilR = pupilR;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      armL.rotation.set(0, 0, 0.35);
      armR.rotation.set(0, 0, -0.35);
      head.rotation.set(0, 0, 0);
      mouth.scale.y = 1;
      pupilL.position.x = -0.08;
      pupilR.position.x = 0.1;
      return;
    }

    const cycle = time % 8;
    const bounce = cycle >= 2 && cycle < 3.4 ? Math.abs(Math.sin(time * 10)) * 0.018 : 0;
    group.position.y = group.userData.seatY + bounce;

    const glance = cycle < 2 ? Math.sin(time * 3.2) * 0.22 : cycle >= 6.4 ? 0.06 : 0;
    head.rotation.y = glance;
    head.rotation.x = cycle >= 3.5 && cycle < 5 ? -0.28 : Math.sin(time * 1.4) * 0.04;
    mouth.scale.y = cycle >= 3.5 && cycle < 5 ? 2.2 : 1;

    const busy = cycle < 2 || (cycle >= 5 && cycle < 6.5);
    if (busy) {
      armL.rotation.x = Math.sin(time * 9) * 0.45;
      armR.rotation.x = Math.sin(time * 9 + 1.2) * 0.5;
      armL.rotation.z = 0.5 + Math.sin(time * 7) * 0.2;
      armR.rotation.z = -0.5 - Math.sin(time * 7 + 0.6) * 0.2;
    } else {
      armL.rotation.x = Math.sin(time * 2.2) * 0.08;
      armR.rotation.x = Math.sin(time * 2.2 + 0.4) * 0.08;
      armL.rotation.z = 0.35;
      armR.rotation.z = -0.35;
    }

    pupilL.position.x = -0.08 + glance * 0.03;
    pupilR.position.x = 0.1 + glance * 0.03;
  };

  return group;
}
