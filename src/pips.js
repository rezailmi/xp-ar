import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import { catBlackTexture, catCreamTexture, catFaceTexture, catWhiteTexture } from "./textures.js";

export function createPips() {
  const group = new THREE.Group();
  group.name = "Pips";
  group.scale.setScalar(1.42);

  const blackMat = createPS1Material({
    map: catBlackTexture(),
    color: "#ffffff",
    wobble: 0.01,
    emissive: "#141018",
  });
  const whiteMat = createPS1Material({
    map: catWhiteTexture(),
    color: "#ffffff",
    wobble: 0.008,
    holdTint: 0.42,
    emissive: "#1a1610",
  });
  const creamMat = createPS1Material({
    map: catCreamTexture(),
    color: "#ffffff",
    wobble: 0.006,
    holdTint: 0.28,
  });
  const faceMat = createPS1Material({
    map: catFaceTexture(),
    color: "#ffffff",
    wobble: 0.004,
    holdTint: 0.4,
    emissive: "#181410",
  });

  const belly = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.08, 0.22), whiteMat);
  belly.position.set(0, 0.085, 0.04);
  group.add(belly);

  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.07, 0.18), blackMat);
  saddle.position.set(0, 0.135, 0.02);
  group.add(saddle);

  const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.08), blackMat);
  shoulder.position.set(0, 0.13, 0.12);
  group.add(shoulder);

  const creamBack = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.06), creamMat);
  creamBack.position.set(0.015, 0.172, 0.0);
  group.add(creamBack);

  const haunches = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.12), whiteMat);
  haunches.position.set(0, 0.085, -0.08);
  group.add(haunches);

  const haunchPatch = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.08), blackMat);
  haunchPatch.position.set(0, 0.13, -0.08);
  group.add(haunchPatch);

  const head = new THREE.Group();
  head.position.set(0, 0.18, 0.16);
  group.add(head);

  const face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.1), faceMat);
  face.position.set(0, -0.01, 0.02);
  head.add(face);

  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.055, 0.11), blackMat);
  cap.position.set(0, 0.045, -0.005);
  head.add(cap);

  const creamHead = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, 0.04), creamMat);
  creamHead.position.set(0.01, 0.075, 0.01);
  head.add(creamHead);

  const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.045, 0.05), whiteMat);
  muzzle.position.set(0, -0.02, 0.065);
  head.add(muzzle);

  const earL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.065, 0.028), blackMat);
  earL.position.set(-0.045, 0.085, -0.015);
  earL.rotation.z = 0.16;
  const earR = earL.clone();
  earR.position.x = 0.045;
  earR.rotation.z = -0.16;
  head.add(earL, earR);

  const balloonAnchor = new THREE.Object3D();
  balloonAnchor.position.set(0.02, 0.04, 0.01);
  earR.add(balloonAnchor);

  const frontL = new THREE.Group();
  frontL.position.set(-0.045, 0.1, 0.14);
  const frontR = new THREE.Group();
  frontR.position.set(0.045, 0.1, 0.14);
  const frontShin = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.035), whiteMat);
  frontShin.position.set(0, -0.04, 0);
  const frontPaw = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.026, 0.048), whiteMat);
  frontPaw.position.set(0, -0.09, 0.006);
  frontL.add(frontShin.clone(), frontPaw.clone());
  frontR.add(frontShin, frontPaw);
  group.add(frontL, frontR);

  const backL = new THREE.Group();
  backL.position.set(-0.05, 0.07, -0.12);
  const backR = new THREE.Group();
  backR.position.set(0.05, 0.07, -0.12);
  const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.07, 0.07), whiteMat);
  thigh.position.set(0, 0.01, 0);
  const hindPaw = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.024, 0.05), whiteMat);
  hindPaw.position.set(0, -0.05, 0.01);
  backL.add(thigh.clone(), hindPaw.clone());
  const sock = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.035, 0.042), blackMat);
  sock.position.set(0, -0.02, 0);
  backR.add(thigh, sock, hindPaw);
  group.add(backL, backR);

  const tail = new THREE.Group();
  tail.position.set(0, 0.1, -0.15);
  const tailBase = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.1), blackMat);
  tailBase.position.set(0, 0, -0.05);
  const tailMid = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.028, 0.08), blackMat);
  tailMid.position.set(0, -0.005, -0.13);
  const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.026, 0.05), whiteMat);
  tailTip.position.set(0, -0.008, -0.19);
  tail.add(tailBase, tailMid, tailTip);
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 8),
    new THREE.MeshBasicMaterial({
      color: 0x0a0814,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.012, 0.0);
  group.add(shadow);

  const bellyY = belly.position.y;
  const saddleY = saddle.position.y;
  const headY = head.position.y;

  group.userData.head = head;
  group.userData.balloonAnchor = balloonAnchor;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      head.rotation.set(0, 0, 0);
      tail.rotation.set(0.12, 0, 0);
      frontL.rotation.set(0, 0, 0);
      frontR.rotation.set(0, 0, 0);
      belly.rotation.x = 0;
      saddle.rotation.x = 0;
      belly.position.y = bellyY;
      saddle.position.y = saddleY;
      head.position.y = headY;
      return;
    }

    const breath = Math.sin(time * 1.7) * 0.005;
    belly.position.y = bellyY + breath;
    saddle.position.y = saddleY + breath;
    shoulder.position.y = 0.13 + breath;
    head.position.y = headY + breath * 0.45;

    const cycle = time % 10;
    const glance = cycle < 1.8 ? Math.sin(time * 2.1) * 0.22 : cycle >= 6.2 && cycle < 7.4 ? -0.18 : 0;
    head.rotation.y = glance;
    head.rotation.x = Math.sin(time * 1.2) * 0.03;

    tail.rotation.x = 0.12 + Math.sin(time * 1.6) * 0.04;
    tail.rotation.y = cycle >= 4.6 && cycle < 5.05 ? Math.sin(time * 14) * 0.35 : Math.sin(time * 1.1) * 0.06;
    tailMid.rotation.y = Math.sin(time * 1.8) * 0.08;

    const shift = Math.sin(time * 0.9) * 0.025;
    group.rotation.z = shift;
    haunches.rotation.z = -shift * 0.35;

    const step = cycle >= 7.6 && cycle < 8.5;
    if (step) {
      const lift = Math.abs(Math.sin(time * 8)) * 0.4;
      frontL.rotation.x = lift;
      frontR.rotation.x = -lift * 0.4;
      backR.rotation.x = lift * 0.3;
      backL.rotation.x = -lift * 0.2;
    } else {
      frontL.rotation.x = Math.sin(time * 1.3) * 0.035;
      frontR.rotation.x = Math.sin(time * 1.3 + 0.8) * 0.035;
      backL.rotation.x = 0;
      backR.rotation.x = 0;
    }

    const lounge = cycle >= 2 && cycle < 3.4;
    belly.rotation.x = lounge ? 0.22 : 0;
    saddle.rotation.x = lounge ? 0.22 : 0;
    haunches.rotation.x = lounge ? 0.12 : 0;

    const bounce = cycle >= 9.2 && cycle < 9.55 ? Math.abs(Math.sin(time * 8)) * 0.007 : 0;
    group.position.y = group.userData.seatY + bounce;
  };

  return group;
}
