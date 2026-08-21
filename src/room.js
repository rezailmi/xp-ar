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
  wallpaper.repeat.set(3, 2);
  const wallMat = createPS1Material({ map: wallpaper, color: "#ffffff", wobble: 0.008 });

  const floorMap = floorTexture();
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(6, 6);
  const floorMat = createPS1Material({ map: floorMap, color: "#ffffff", wobble: 0.006 });

  const trimMat = createPS1Material({ map: woodTrimTexture(), color: "#ffffff", wobble: 0.008 });
  const sofaMat = createPS1Material({ map: sofaTexture(), color: "#ffffff", wobble: 0.01 });
  const beigeMat = createPS1Material({ map: crtBeigeTexture(), color: "#ffffff", wobble: 0.008 });
  const shadeMat = createPS1Material({ map: shadeTexture(), color: "#ffffff", wobble: 0.01 });
  const darkMat = createPS1Material({ color: "#2A2420", wobble: 0.006 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 7.2, 4, 4), floorMat);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 7.2, 2, 2),
    createPS1Material({ color: "#B89A74", wobble: 0.004 }),
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 2.58;
  room.add(ceiling);

  room.add(wall(0, 1.29, -3.58, 7.2, 2.58, 0.12, wallMat));
  room.add(wall(-3.58, 1.29, 0, 0.12, 2.58, 7.2, wallMat));
  room.add(wall(3.58, 1.29, 0, 0.12, 2.58, 7.2, wallMat));
  room.add(wall(0, 1.29, 3.58, 7.2, 2.58, 0.12, wallMat));

  room.add(baseboard(0, 0.06, -3.5, 7.1, 0.12, 0.08, trimMat));
  room.add(baseboard(-3.5, 0.06, 0, 0.08, 0.12, 7.1, trimMat));
  room.add(baseboard(3.5, 0.06, 0, 0.08, 0.12, 7.1, trimMat));

  const rug = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.04, 1.9), createPS1Material({
    map: rugTexture(),
    color: "#ffffff",
    wobble: 0.01,
  }));
  rug.position.set(0, 0.025, 0.1);
  room.add(rug);

  room.add(createSofa(0.05, 0, -2.42, sofaMat, trimMat));
  room.add(createTable(0.1, 0, -1.28, trimMat));
  room.add(createCrtStand(2.2, 0, -2.15, beigeMat, darkMat, trimMat));
  room.add(createLamp(-2.4, 0, -2.2, trimMat, shadeMat, beigeMat));
  room.add(createWindow(-3.5, 1.45, 0.4, trimMat));
  room.add(createPicture(0.9, 1.85, -3.5, trimMat, sofaMat));

  return room;
}

function wall(x, y, z, w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  return mesh;
}

function baseboard(x, y, z, w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  return mesh;
}

function createSofa(x, y, z, sofaMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.36, 0.82), sofaMat);
  seat.position.set(0, 0.34, 0);
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.22), sofaMat);
  back.position.set(0, 0.72, -0.34);
  group.add(back);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.48, 0.82), sofaMat);
  armL.position.set(-1.1, 0.52, 0);
  const armR = armL.clone();
  armR.position.x = 1.1;
  group.add(armL, armR);

  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.14, 0.62), sofaMat);
  cushionL.position.set(-0.46, 0.56, 0.04);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.46;
  group.add(cushionL, cushionR);

  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.12), trimMat);
  const feet = [
    [-1.05, 0.07, 0.32],
    [1.05, 0.07, 0.32],
    [-1.05, 0.07, -0.32],
    [1.05, 0.07, -0.32],
  ];
  for (const [fx, fy, fz] of feet) {
    const f = foot.clone();
    f.position.set(fx, fy, fz);
    group.add(f);
  }

  return group;
}

function createTable(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 0.58), trimMat);
  top.position.y = 0.38;
  group.add(top);
  const legs = [
    [-0.48, 0.18, 0.22],
    [0.48, 0.18, 0.22],
    [-0.48, 0.18, -0.22],
    [0.48, 0.18, -0.22],
  ];
  for (const [lx, ly, lz] of legs) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.08), trimMat);
    leg.position.set(lx, ly, lz);
    group.add(leg);
  }
  return group;
}

function createCrtStand(x, y, z, beigeMat, darkMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = -0.35;

  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.46, 0.48), trimMat);
  stand.position.y = 0.23;
  group.add(stand);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.58, 0.52), beigeMat);
  body.position.set(0, 0.76, 0);
  group.add(body);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.06), darkMat);
  bezel.position.set(0, 0.8, 0.26);
  group.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.34),
    createPS1Material({ map: tvSnowTexture(), color: "#ffffff", wobble: 0 }),
  );
  screen.position.set(0, 0.8, 0.295);
  group.add(screen);

  const dial = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), darkMat);
  dial.position.set(0.28, 0.56, 0.26);
  group.add(dial);

  return group;
}

function createLamp(x, y, z, trimMat, shadeMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.32), beigeMat);
  base.position.y = 0.04;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.35, 0.07), trimMat);
  pole.position.y = 0.74;
  group.add(pole);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 0.36, 6, 1, true), shadeMat);
  shade.position.y = 1.48;
  group.add(shade);
  const shadeTop = new THREE.Mesh(new THREE.CircleGeometry(0.18, 6), shadeMat);
  shadeTop.rotation.x = -Math.PI / 2;
  shadeTop.position.y = 1.66;
  group.add(shadeTop);
  return group;
}

function createWindow(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.15, 1.35), trimMat);
  group.add(frame);
  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.95),
    createPS1Material({ color: "#6A7A82", wobble: 0.004 }),
  );
  pane.rotation.y = Math.PI / 2;
  pane.position.x = 0.05;
  group.add(pane);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.05, 0.06), trimMat);
  bar.position.x = 0.02;
  group.add(bar);
  return group;
}

function createPicture(x, y, z, trimMat, sofaMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.56, 0.06), trimMat);
  group.add(frame);
  const art = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.42), sofaMat);
  art.position.z = 0.035;
  group.add(art);
  return group;
}
