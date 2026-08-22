import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import { catBlackTexture, catWhiteTexture } from "./textures.js";

export function createPips() {
  const group = new THREE.Group();
  group.name = "Pips";

  const blackMat = createPS1Material({ map: catBlackTexture(), color: "#ffffff", wobble: 0.01 });
  const whiteMat = createPS1Material({ map: catWhiteTexture(), color: "#ffffff", wobble: 0.008 });
  const eyeMat = createPS1Material({ color: "#C8D24A", wobble: 0.004 });
  const pupilMat = createPS1Material({ color: "#111111", wobble: 0.003 });
  const noseMat = createPS1Material({ color: "#2A1A1A", wobble: 0.004 });
  const innerEarMat = createPS1Material({ color: "#C49088", wobble: 0.004 });

  const haunches = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.11, 0.15), blackMat);
  haunches.position.set(0, 0.09, -0.05);
  group.add(haunches);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.11, 0.2), blackMat);
  body.position.set(0, 0.115, 0.07);
  group.add(body);

  const bib = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), whiteMat);
  bib.position.set(0, 0.1, 0.16);
  group.add(bib);

  const head = new THREE.Group();
  head.position.set(0, 0.2, 0.17);
  group.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.11, 0.12), blackMat);
  head.add(skull);

  const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.055, 0.055), whiteMat);
  muzzle.position.set(0, -0.015, 0.07);
  head.add(muzzle);

  const earL = new THREE.Group();
  earL.position.set(-0.05, 0.075, -0.01);
  const earLOuter = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.07, 0.03), blackMat);
  earLOuter.rotation.z = 0.18;
  const earLInner = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.04, 0.02), innerEarMat);
  earLInner.position.set(0, 0.005, 0.012);
  earL.add(earLOuter, earLInner);
  head.add(earL);

  const earR = new THREE.Group();
  earR.position.set(0.05, 0.075, -0.01);
  const earROuter = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.07, 0.03), blackMat);
  earROuter.rotation.z = -0.18;
  const earRInner = earLInner.clone();
  earR.add(earROuter, earRInner);
  head.add(earR);

  const balloonAnchor = new THREE.Object3D();
  balloonAnchor.position.set(0.03, 0.05, 0.02);
  earR.add(balloonAnchor);

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.022, 0.02), eyeMat);
  eyeL.position.set(-0.032, 0.018, 0.062);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.032;
  head.add(eyeL, eyeR);

  const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.02, 0.012), pupilMat);
  pupilL.position.set(-0.032, 0.016, 0.072);
  const pupilR = pupilL.clone();
  pupilR.position.x = 0.032;
  head.add(pupilL, pupilR);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.014, 0.016), noseMat);
  nose.position.set(0, -0.012, 0.1);
  head.add(nose);

  const frontL = new THREE.Group();
  frontL.position.set(-0.045, 0.1, 0.15);
  const frontR = new THREE.Group();
  frontR.position.set(0.045, 0.1, 0.15);
  const shin = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.035), blackMat);
  shin.position.set(0, -0.04, 0);
  const paw = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.028, 0.05), whiteMat);
  paw.position.set(0, -0.09, 0.008);
  frontL.add(shin.clone(), paw.clone());
  frontR.add(shin, paw);
  group.add(frontL, frontR);

  const backL = new THREE.Group();
  backL.position.set(-0.05, 0.07, -0.1);
  const backR = new THREE.Group();
  backR.position.set(0.05, 0.07, -0.1);
  const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.07, 0.07), blackMat);
  thigh.position.set(0, 0.01, 0);
  const hindPaw = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.026, 0.05), whiteMat);
  hindPaw.position.set(0, -0.05, 0.01);
  backL.add(thigh.clone(), hindPaw.clone());
  backR.add(thigh, hindPaw);
  group.add(backL, backR);

  const tail = new THREE.Group();
  tail.position.set(0, 0.13, -0.13);
  const tailBase = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.08), blackMat);
  tailBase.position.set(0, 0.02, -0.03);
  const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.07), blackMat);
  tailTip.position.set(0, 0.05, -0.08);
  tailTip.rotation.x = 0.6;
  tail.add(tailBase, tailTip);
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.14, 8),
    new THREE.MeshBasicMaterial({
      color: 0x0a0814,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.012, 0.02);
  group.add(shadow);

  const bodyY = body.position.y;
  const headY = head.position.y;

  group.userData.head = head;
  group.userData.balloonAnchor = balloonAnchor;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      head.rotation.set(0, 0, 0);
      tail.rotation.set(0.35, 0, 0);
      frontL.rotation.set(0, 0, 0);
      frontR.rotation.set(0, 0, 0);
      body.rotation.x = 0;
      body.position.y = bodyY;
      head.position.y = headY;
      eyeL.scale.y = 1;
      eyeR.scale.y = 1;
      return;
    }

    const breath = Math.sin(time * 1.7) * 0.006;
    body.position.y = bodyY + breath;
    bib.position.y = 0.1 + breath;
    head.position.y = headY + breath * 0.5;

    const cycle = time % 10;
    const glance = cycle < 1.8 ? Math.sin(time * 2.1) * 0.28 : cycle >= 6.2 && cycle < 7.4 ? -0.22 : 0;
    head.rotation.y = glance;
    head.rotation.x = Math.sin(time * 1.2) * 0.04;

    const blink = cycle >= 3.1 && cycle < 3.22 || cycle >= 8.4 && cycle < 8.5;
    eyeL.scale.y = blink ? 0.15 : 1;
    eyeR.scale.y = blink ? 0.15 : 1;
    pupilL.scale.y = blink ? 0.15 : 1;
    pupilR.scale.y = blink ? 0.15 : 1;

    tail.rotation.x = 0.4 + Math.sin(time * 2.4) * 0.08;
    tail.rotation.z = cycle >= 4.6 && cycle < 5.05 ? Math.sin(time * 16) * 0.45 : Math.sin(time * 1.3) * 0.08;
    tailTip.rotation.x = 0.6 + Math.sin(time * 3.1) * 0.12;

    const shift = Math.sin(time * 0.9) * 0.03;
    group.rotation.z = shift;
    haunches.rotation.z = -shift * 0.4;

    const step = cycle >= 7.6 && cycle < 8.3;
    if (step) {
      const lift = Math.abs(Math.sin(time * 9)) * 0.35;
      frontL.rotation.x = lift;
      frontR.rotation.x = -lift * 0.35;
    } else {
      frontL.rotation.x = Math.sin(time * 1.4) * 0.04;
      frontR.rotation.x = Math.sin(time * 1.4 + 0.8) * 0.04;
    }

    const lounge = cycle >= 2 && cycle < 3.4;
    body.rotation.x = lounge ? 0.28 : 0;
    haunches.rotation.x = lounge ? 0.18 : 0;

    const bounce = cycle >= 9.2 && cycle < 9.55 ? Math.abs(Math.sin(time * 8)) * 0.008 : 0;
    group.position.y = group.userData.seatY + bounce;

    pupilL.position.x = -0.032 + glance * 0.01;
    pupilR.position.x = 0.032 + glance * 0.01;
  };

  return group;
}
