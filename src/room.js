import * as THREE from "three";
import { createPS1Material } from "./ps1-material.js";
import {
  crtBeigeTexture,
  floorTexture,
  rugTexture,
  shadeTexture,
  sofaTexture,
  tvSnowTexture,
  wallpaperTexture,
  woodTrimTexture,
} from "./textures.js";

export const ROOM = {
  halfW: 1.7,
  halfD: 1.6,
  height: 2.15,
  cam: { x: 1.42, z: 1.32, yMin: 0.42, yMax: 1.88 },
  walk: { x: 1.05, zMin: -0.2, zMax: 1.12 },
};

export function createRoom() {
  const room = new THREE.Group();
  room.name = "LivingRoom";

  const wallpaper = wallpaperTexture();
  wallpaper.wrapS = THREE.RepeatWrapping;
  wallpaper.wrapT = THREE.RepeatWrapping;
  wallpaper.repeat.set(1.6, 1.15);
  const wallMat = createPS1Material({ map: wallpaper, color: "#ffffff", wobble: 0.006 });

  const floorMap = floorTexture();
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(3, 3);
  const floorMat = createPS1Material({ map: floorMap, color: "#ffffff", wobble: 0.004 });
  const trimMat = createPS1Material({ map: woodTrimTexture(), color: "#ffffff", wobble: 0.006 });
  const sofaMat = createPS1Material({ map: sofaTexture(), color: "#ffffff", wobble: 0.008 });
  const beigeMat = createPS1Material({ map: crtBeigeTexture(), color: "#ffffff", wobble: 0.006 });
  const shadeMat = createPS1Material({ map: shadeTexture(), color: "#ffffff", wobble: 0.007 });
  const darkMat = createPS1Material({ color: "#2A2420", wobble: 0.004 });
  const blindMat = createPS1Material({ color: "#B39168", wobble: 0.004 });

  const w = ROOM.halfW * 2;
  const d = ROOM.halfD * 2;
  const h = ROOM.height;

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.2, d + 0.2, 2, 2), floorMat);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.2, d + 0.2, 2, 2),
    createPS1Material({ color: "#B89A74", wobble: 0.003 }),
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = h;
  room.add(ceiling);

  room.add(box(0, h / 2, -ROOM.halfD - 0.06, w + 0.24, h, 0.14, wallMat));
  room.add(box(0, h / 2, ROOM.halfD + 0.06, w + 0.24, h, 0.14, wallMat));
  room.add(box(-ROOM.halfW - 0.06, h / 2, 0, 0.14, h, d + 0.24, wallMat));
  room.add(box(ROOM.halfW + 0.06, h / 2, 0, 0.14, h, d + 0.24, wallMat));

  room.add(box(0, 0.05, -ROOM.halfD + 0.02, w - 0.1, 0.1, 0.05, trimMat));
  room.add(box(-ROOM.halfW + 0.02, 0.05, 0, 0.05, 0.1, d - 0.1, trimMat));
  room.add(box(ROOM.halfW - 0.02, 0.05, 0, 0.05, 0.1, d - 0.1, trimMat));

  const rug = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 0.03, 1.05),
    createPS1Material({ map: rugTexture(), color: "#ffffff", wobble: 0.007 }),
  );
  rug.position.set(0.05, 0.02, 0.22);
  room.add(rug);

  room.add(createSofa(0.02, 0, -1.02, sofaMat, trimMat));
  room.add(createTable(0.48, 0, -0.28, trimMat));
  room.add(createCrt(1.12, 0, -0.88, beigeMat, darkMat, trimMat));
  room.add(createLamp(-1.18, 0, -0.95, trimMat, shadeMat, beigeMat));
  room.add(createBlinds(-ROOM.halfW + 0.08, 1.2, 0.05, trimMat, blindMat));
  room.add(createDoor(0.85, 0, ROOM.halfD - 0.02, trimMat, beigeMat));

  return room;
}

function box(x, y, z, w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  return mesh;
}

function createSofa(x, y, z, sofaMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.28, 0.62), sofaMat);
  seat.position.set(0, 0.28, 0.04);
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.52, 0.16), sofaMat);
  back.position.set(0, 0.56, -0.24);
  group.add(back);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.62), sofaMat);
  armL.position.set(-0.72, 0.42, 0.04);
  const armR = armL.clone();
  armR.position.x = 0.72;
  group.add(armL, armR);

  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.1, 0.48), sofaMat);
  cushionL.position.set(-0.3, 0.46, 0.08);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.3;
  group.add(cushionL, cushionR);

  for (const [fx, fz] of [
    [-0.66, 0.24],
    [0.66, 0.24],
    [-0.66, -0.18],
    [0.66, -0.18],
  ]) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.09), trimMat);
    foot.position.set(fx, 0.06, fz);
    group.add(foot);
  }

  return group;
}

function createTable(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.05, 0.4), trimMat);
  top.position.y = 0.32;
  group.add(top);
  for (const [lx, lz] of [
    [-0.3, 0.14],
    [0.3, 0.14],
    [-0.3, -0.14],
    [0.3, -0.14],
  ]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), trimMat);
    leg.position.set(lx, 0.15, lz);
    group.add(leg);
  }
  return group;
}

function createCrt(x, y, z, beigeMat, darkMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = -0.5;

  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.34, 0.34), trimMat);
  stand.position.y = 0.17;
  group.add(stand);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.42, 0.38), beigeMat);
  body.position.set(0, 0.56, 0);
  group.add(body);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.04), darkMat);
  bezel.position.set(0, 0.6, 0.19);
  group.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.24),
    createPS1Material({ map: tvSnowTexture(), color: "#ffffff", wobble: 0 }),
  );
  screen.position.set(0, 0.6, 0.215);
  group.add(screen);

  return group;
}

function createLamp(x, y, z, trimMat, shadeMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.22), beigeMat);
  base.position.y = 0.03;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.05, 0.05), trimMat);
  pole.position.y = 0.56;
  group.add(pole);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.26, 6, 1, true), shadeMat);
  shade.position.y = 1.14;
  group.add(shade);
  const shadeTop = new THREE.Mesh(new THREE.CircleGeometry(0.12, 6), shadeMat);
  shadeTop.rotation.x = -Math.PI / 2;
  shadeTop.position.y = 1.27;
  group.add(shadeTop);
  return group;
}

function createBlinds(x, y, z, trimMat, blindMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.88, 0.92), trimMat);
  group.add(frame);
  for (let i = 0; i < 8; i += 1) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.07, 0.8), blindMat);
    slat.position.set(0.03, -0.32 + i * 0.09, 0);
    group.add(slat);
  }
  return group;
}

function createDoor(x, y, z, trimMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.7, 0.06), beigeMat);
  slab.position.y = 0.85;
  group.add(slab);
  const jamb = new THREE.Mesh(new THREE.BoxGeometry(0.82, 1.78, 0.08), trimMat);
  jamb.position.y = 0.89;
  group.add(jamb);
  const knob = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), trimMat);
  knob.position.set(-0.26, 0.82, -0.06);
  group.add(knob);
  return group;
}
