import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import { gauntletTexture, pipsFurTexture, sneakerTexture } from "./textures.js";

export function createPips() {
  const group = new THREE.Group();
  group.name = "Pips";

  const furMat = createPS1Material({ map: pipsFurTexture(), color: "#ffffff", wobble: 0.02 });
  const mustardMat = createPS1Material({ color: "#D4923A", wobble: 0.016 });
  const gauntletMat = createPS1Material({ map: gauntletTexture(), color: "#ffffff", wobble: 0.014 });
  const shoeMat = createPS1Material({ map: sneakerTexture(), color: "#ffffff", wobble: 0.012 });
  const eyeWhite = createPS1Material({ color: "#F4EDE0", wobble: 0.01 });
  const pupilMat = createPS1Material({ color: "#111111", wobble: 0.008 });
  const noseMat = createPS1Material({ color: "#4A3B12", wobble: 0.01 });
  const innerEar = createPS1Material({ color: "#E8D8B0", wobble: 0.012 });

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.28, 0.24), furMat);
  hips.position.set(0, 0.62, 0);
  group.add(hips);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.38, 0.26), furMat);
  torso.position.set(0, 0.92, 0.02);
  group.add(torso);

  const chevron = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.06), mustardMat);
  chevron.position.set(0, 0.9, 0.15);
  group.add(chevron);

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), furMat);
  neck.position.set(0, 1.14, 0.04);
  group.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 1.32, 0.06);
  group.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 0.34), furMat);
  head.add(skull);

  const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.14), mustardMat);
  muzzle.position.set(0, -0.06, 0.2);
  head.add(muzzle);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.06), noseMat);
  nose.position.set(0, -0.04, 0.28);
  head.add(nose);

  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.14, 0.06), eyeWhite);
  eyeL.position.set(-0.1, 0.04, 0.17);
  const eyeR = eyeL.clone();
  eyeR.scale.set(1.15, 1.2, 1);
  eyeR.position.set(0.11, 0.05, 0.17);
  head.add(eyeL, eyeR);

  const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.04), pupilMat);
  pupilL.position.set(-0.1, 0.03, 0.21);
  const pupilR = pupilL.clone();
  pupilR.position.set(0.12, 0.04, 0.21);
  head.add(pupilL, pupilR);

  const earL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.08), furMat);
  earL.position.set(-0.2, 0.2, -0.02);
  earL.rotation.z = 0.25;
  const earR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.08), furMat);
  earR.position.set(0.22, 0.08, -0.02);
  earR.rotation.z = -1.15;
  const earIn = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.03), innerEar);
  earIn.position.set(-0.2, 0.2, 0.03);
  head.add(earL, earR, earIn);

  const cowlick = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.08), furMat);
  cowlick.position.set(-0.04, 0.22, 0.08);
  cowlick.rotation.x = -0.55;
  head.add(cowlick);

  const armL = new THREE.Group();
  armL.position.set(-0.28, 0.98, 0.02);
  const armR = new THREE.Group();
  armR.position.set(0.28, 0.98, 0.02);
  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.12), furMat);
  upper.position.set(0, -0.12, 0);
  const gloveL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), gauntletMat);
  gloveL.position.set(0, -0.32, 0.02);
  const gloveR = gloveL.clone();
  armL.add(upper.clone(), gloveL);
  armR.add(upper, gloveR);
  armL.rotation.z = 0.62;
  armR.rotation.z = -0.62;
  group.add(armL, armR);

  const thighGeo = new THREE.BoxGeometry(0.14, 0.28, 0.16);
  const shinGeo = new THREE.BoxGeometry(0.13, 0.24, 0.14);
  const shoeGeo = new THREE.BoxGeometry(0.18, 0.1, 0.28);

  const legL = new THREE.Group();
  legL.position.set(-0.12, 0.48, 0.02);
  const thighL = new THREE.Mesh(thighGeo, furMat);
  thighL.position.set(0, -0.06, 0.04);
  thighL.rotation.x = -0.35;
  const shinL = new THREE.Mesh(shinGeo, furMat);
  shinL.position.set(0, -0.28, 0.08);
  const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
  shoeL.position.set(0, -0.42, 0.12);
  legL.add(thighL, shinL, shoeL);

  const legR = new THREE.Group();
  legR.position.set(0.12, 0.48, 0.02);
  const thighR = new THREE.Mesh(thighGeo, furMat);
  thighR.position.set(0, -0.06, 0.04);
  thighR.rotation.x = 0.15;
  const shinR = new THREE.Mesh(shinGeo, furMat);
  shinR.position.set(0, -0.28, 0.02);
  const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
  shoeR.position.set(0, -0.42, 0.08);
  legR.add(thighR, shinR, shoeR);
  group.add(legL, legR);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.18), furMat);
  tail.position.set(0.02, 0.62, -0.18);
  tail.rotation.x = 0.4;
  group.add(tail);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.38, 8),
    new THREE.MeshBasicMaterial({
      color: 0x2a1810,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.03;
  group.add(shadow);

  group.userData.head = head;
  group.userData.armL = armL;
  group.userData.armR = armR;
  group.userData.baseY = 0;

  group.userData.update = (time, reduceMotion) => {
    if (reduceMotion) {
      group.position.y = group.userData.baseY;
      group.rotation.y = 0;
      armL.rotation.z = 0.62;
      armR.rotation.z = -0.62;
      head.rotation.y = 0;
      return;
    }
    const bounce = Math.abs(Math.sin(time * 7.1)) * 0.034;
    group.position.y = group.userData.baseY + bounce;
    const windup = Math.pow(Math.max(0, Math.sin(time * 1.05)), 12) * 1.35;
    group.rotation.y = Math.sin(time * 1.9) * 0.1 + windup;
    armL.rotation.z = 0.62 + Math.sin(time * 7.1) * 0.22;
    armR.rotation.z = -0.62 - Math.sin(time * 7.1) * 0.22;
    head.rotation.y = Math.sin(time * 2.6) * 0.14;
    head.rotation.z = Math.sin(time * 3.4) * 0.07;
  };

  return group;
}
