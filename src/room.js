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

export function createRoom() {
  const room = new THREE.Group();
  room.name = "LivingRoom";

  const wallpaper = wallpaperTexture();
  wallpaper.wrapS = THREE.RepeatWrapping;
  wallpaper.wrapT = THREE.RepeatWrapping;
  wallpaper.repeat.set(2, 1.35);
  const wallMat = createPS1Material({ map: wallpaper, color: "#ffffff", wobble: 0.007 });

  const floorMap = floorTexture();
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(4, 4);
  const floorMat = createPS1Material({ map: floorMap, color: "#ffffff", wobble: 0.005 });
  const trimMat = createPS1Material({ map: woodTrimTexture(), color: "#ffffff", wobble: 0.007 });
  const sofaMat = createPS1Material({ map: sofaTexture(), color: "#ffffff", wobble: 0.009 });
  const beigeMat = createPS1Material({ map: crtBeigeTexture(), color: "#ffffff", wobble: 0.007 });
  const shadeMat = createPS1Material({ map: shadeTexture(), color: "#ffffff", wobble: 0.008 });
  const darkMat = createPS1Material({ color: "#2A2420", wobble: 0.005 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.4, 3, 3), floorMat);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, 4.4, 2, 2),
    createPS1Material({ color: "#B89A74", wobble: 0.003 }),
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 2.32;
  room.add(ceiling);

  room.add(box(0, 1.16, -2.22, 4.6, 2.32, 0.1, wallMat));
  room.add(box(-2.3, 1.16, 0, 0.1, 2.32, 4.4, wallMat));
  room.add(box(2.3, 1.16, 0, 0.1, 2.32, 4.4, wallMat));
  room.add(box(0, 1.16, 2.22, 4.6, 2.32, 0.1, wallMat));

  room.add(box(0, 0.05, -2.15, 4.4, 0.1, 0.06, trimMat));
  room.add(box(-2.23, 0.05, 0, 0.06, 0.1, 4.2, trimMat));
  room.add(box(2.23, 0.05, 0, 0.06, 0.1, 4.2, trimMat));

  const rug = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.03, 1.25),
    createPS1Material({ map: rugTexture(), color: "#ffffff", wobble: 0.008 }),
  );
  rug.position.set(0, 0.02, 0.08);
  room.add(rug);

  room.add(createSofa(0, 0, -1.48, sofaMat, trimMat));
  room.add(createTable(0, 0, -0.78, trimMat));
  room.add(createCrt(1.38, 0, -1.28, beigeMat, darkMat, trimMat));
  room.add(createLamp(-1.42, 0, -1.32, trimMat, shadeMat, beigeMat));
  room.add(createWindow(-2.24, 1.32, 0.15, trimMat));

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

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.32, 0.7), sofaMat);
  seat.position.set(0, 0.3, 0.02);
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.58, 0.18), sofaMat);
  back.position.set(0, 0.62, -0.28);
  group.add(back);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.42, 0.7), sofaMat);
  armL.position.set(-0.77, 0.46, 0.02);
  const armR = armL.clone();
  armR.position.x = 0.77;
  group.add(armL, armR);

  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.12, 0.52), sofaMat);
  cushionL.position.set(-0.32, 0.5, 0.06);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.32;
  group.add(cushionL, cushionR);

  for (const [fx, fz] of [
    [-0.72, 0.26],
    [0.72, 0.26],
    [-0.72, -0.24],
    [0.72, -0.24],
  ]) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.1), trimMat);
    foot.position.set(fx, 0.06, fz);
    group.add(foot);
  }

  return group;
}

function createTable(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.06, 0.46), trimMat);
  top.position.y = 0.34;
  group.add(top);
  for (const [lx, lz] of [
    [-0.36, 0.16],
    [0.36, 0.16],
    [-0.36, -0.16],
    [0.36, -0.16],
  ]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.32, 0.07), trimMat);
    leg.position.set(lx, 0.16, lz);
    group.add(leg);
  }
  return group;
}

function createCrt(x, y, z, beigeMat, darkMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = -0.42;

  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.38, 0.4), trimMat);
  stand.position.y = 0.19;
  group.add(stand);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.48, 0.44), beigeMat);
  body.position.set(0, 0.64, 0);
  group.add(body);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.34, 0.05), darkMat);
  bezel.position.set(0, 0.68, 0.22);
  group.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.28),
    createPS1Material({ map: tvSnowTexture(), color: "#ffffff", wobble: 0 }),
  );
  screen.position.set(0, 0.68, 0.25);
  group.add(screen);

  return group;
}

function createLamp(x, y, z, trimMat, shadeMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.07, 0.26), beigeMat);
  base.position.y = 0.04;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.18, 0.06), trimMat);
  pole.position.y = 0.64;
  group.add(pole);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.26, 0.3, 6, 1, true), shadeMat);
  shade.position.y = 1.28;
  group.add(shade);
  const shadeTop = new THREE.Mesh(new THREE.CircleGeometry(0.14, 6), shadeMat);
  shadeTop.rotation.x = -Math.PI / 2;
  shadeTop.position.y = 1.43;
  group.add(shadeTop);
  return group;
}

function createWindow(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.95, 1.05), trimMat);
  group.add(frame);
  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.88, 0.78),
    createPS1Material({ color: "#6A7A82", wobble: 0.003 }),
  );
  pane.rotation.y = Math.PI / 2;
  pane.position.x = 0.04;
  group.add(pane);
  return group;
}
