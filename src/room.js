import * as THREE from "three";
import { createPS1Material, pulseEmissive } from "./ps1-material.js";
import {
  bagTexture,
  blanketTexture,
  bottleAmberTexture,
  bottleGreenTexture,
  canTexture,
  floorTexture,
  futonTexture,
  glowTexture,
  lavaTexture,
  metalTexture,
  mountainPosterTexture,
  nightPosterTexture,
  notePosterTexture,
  outsideTexture,
  plasterTexture,
  recordLabelTexture,
  shojiTexture,
  tvGlowTexture,
  vinylBusTexture,
  vinylDotTexture,
  vinylWaveTexture,
  whitePlasticTexture,
  woodTrimTexture,
} from "./textures.js";

export const ROOM = {
  halfW: 1.7,
  halfD: 1.6,
  height: 2.15,
  cam: { x: 1.42, z: 1.38, yMin: 0.2, yMax: 1.35 },
  walk: { x: 1.05, zMin: -0.15, zMax: 1.12 },
};

export function createRoom() {
  const room = new THREE.Group();
  room.name = "LivingRoom";
  const updaters = [];

  const wallpaper = plasterTexture();
  wallpaper.wrapS = THREE.RepeatWrapping;
  wallpaper.wrapT = THREE.RepeatWrapping;
  wallpaper.repeat.set(1.1, 1);
  const wallMat = createPS1Material({ map: wallpaper, color: "#ffffff", wobble: 0.004 });

  const floorMap = floorTexture();
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(4, 4);
  const floorMat = createPS1Material({ map: floorMap, color: "#ffffff", wobble: 0.003 });
  const trimMat = createPS1Material({ map: woodTrimTexture(), color: "#ffffff", wobble: 0.005 });
  const plasticMat = createPS1Material({ map: whitePlasticTexture(), color: "#ffffff", wobble: 0.004 });
  const metalMat = createPS1Material({ map: metalTexture(), color: "#ffffff", wobble: 0.003 });
  const darkMat = createPS1Material({ color: "#130E1F", wobble: 0.003 });
  const shojiMat = createPS1Material({
    map: shojiTexture(),
    color: "#ffffff",
    wobble: 0.003,
    side: THREE.DoubleSide,
  });

  const w = ROOM.halfW * 2;
  const d = ROOM.halfD * 2;
  const h = ROOM.height;

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.2, d + 0.2, 2, 2), floorMat);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(w + 0.2, d + 0.2, 2, 2),
    createPS1Material({ color: "#130E1F", wobble: 0.002 }),
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = h;
  room.add(ceiling);

  room.add(box(0, h / 2, -ROOM.halfD - 0.06, w + 0.24, h, 0.14, wallMat));
  room.add(box(0, h / 2, ROOM.halfD + 0.06, w + 0.24, h, 0.14, wallMat));
  room.add(box(ROOM.halfW + 0.06, h / 2, 0, 0.14, h, d + 0.24, wallMat));
  room.add(leftWallWithHole(wallMat, h, d));

  room.add(box(0, 0.05, -ROOM.halfD + 0.02, w - 0.1, 0.1, 0.05, trimMat));
  room.add(box(-ROOM.halfW + 0.02, 0.05, 0, 0.05, 0.1, d - 0.1, trimMat));
  room.add(box(ROOM.halfW - 0.02, 0.05, 0, 0.05, 0.1, d - 0.1, trimMat));

  room.add(createFuton(-0.22, 0, -0.12, trimMat));
  room.add(createLowTable(0.42, 0, 0.28, trimMat, plasticMat, darkMat));
  room.add(createCrtCorner(1.16, 0, -0.82, plasticMat, darkMat, trimMat, metalMat, updaters));
  room.add(createRecordDresser(1.2, 0, 0.42, plasticMat, metalMat, trimMat, darkMat, updaters));
  room.add(createLavaLamp(-1.22, 0, 0.55, plasticMat, updaters));
  room.add(createWarmLamp(-1.15, 0, -0.95, trimMat, plasticMat));
  room.add(createSlidingGlass(-ROOM.halfW + 0.01, 0.98, -0.18, trimMat, shojiMat));
  room.add(createDoor(0.85, 0, ROOM.halfD - 0.02, trimMat, plasticMat));
  room.add(createPosters(trimMat));
  room.add(createHangingBag(-ROOM.halfW + 0.1, 1.05, 0.78));

  const sunsetFloor = glowPlane(1.45, 1.05, 0xf89d09, 0.42);
  sunsetFloor.rotation.x = -Math.PI / 2;
  sunsetFloor.position.set(-0.55, 0.036, -0.05);
  room.add(sunsetFloor);

  const sunsetWall = glowPlane(0.8, 1.55, 0xd36b11, 0.38);
  sunsetWall.rotation.y = Math.PI / 2;
  sunsetWall.position.set(-ROOM.halfW + 0.09, 1.05, -0.18);
  room.add(sunsetWall);

  const indigoBounce = glowPlane(1.1, 0.8, 0x5350a2, 0.16);
  indigoBounce.position.set(0.15, 0.9, -ROOM.halfD + 0.08);
  room.add(indigoBounce);

  const lavaPool = glowPlane(0.55, 0.55, 0xf0a24a, 0.4);
  lavaPool.rotation.x = -Math.PI / 2;
  lavaPool.position.set(-1.22, 0.04, 0.55);
  room.add(lavaPool);

  room.userData.update = (time) => {
    for (const update of updaters) update(time);
  };

  return room;
}

function leftWallWithHole(wallMat, h, d) {
  const group = new THREE.Group();
  const x = -ROOM.halfW - 0.06;
  const winZ0 = -0.9;
  const winZ1 = 0.54;
  const winY0 = 0.1;
  const winY1 = 1.88;

  group.add(box(x, winY0 / 2, 0, 0.14, winY0, d + 0.24, wallMat));
  group.add(box(x, (h + winY1) / 2, 0, 0.14, h - winY1, d + 0.24, wallMat));
  const southD = winZ0 + ROOM.halfD + 0.12;
  group.add(box(x, (winY0 + winY1) / 2, -ROOM.halfD + southD / 2 - 0.06, 0.14, winY1 - winY0, southD, wallMat));
  const northD = ROOM.halfD - winZ1 + 0.12;
  group.add(box(x, (winY0 + winY1) / 2, ROOM.halfD - northD / 2 + 0.06, 0.14, winY1 - winY0, northD, wallMat));
  return group;
}

function box(x, y, z, w, h, d, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  return mesh;
}

const GLOW_MAP = glowTexture();

function glowPlane(w, h, color, opacity) {
  const mat = new THREE.MeshBasicMaterial({
    map: GLOW_MAP,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
}

function createFuton(x, y, z, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.05, 1.35),
    createPS1Material({ map: futonTexture(), color: "#ffffff", wobble: 0.004 }),
  );
  mattress.position.y = 0.04;
  group.add(mattress);

  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.03, 0.7),
    createPS1Material({ map: blanketTexture(), color: "#ffffff", wobble: 0.005 }),
  );
  blanket.position.set(0.04, 0.075, 0.18);
  group.add(blanket);

  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.08, 0.18),
    createPS1Material({ color: "#E8D8C0", wobble: 0.005 }),
  );
  pillow.position.set(-0.02, 0.09, -0.48);
  group.add(pillow);

  const edge = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.02, 1.38), trimMat);
  edge.position.y = 0.015;
  group.add(edge);

  return group;
}

function createLowTable(x, y, z, trimMat, plasticMat, darkMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const top = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.03, 0.4), plasticMat);
  top.position.y = 0.22;
  group.add(top);
  for (const [lx, lz] of [
    [-0.26, 0.15],
    [0.26, 0.15],
    [-0.26, -0.15],
    [0.26, -0.15],
  ]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.04), trimMat);
    leg.position.set(lx, 0.1, lz);
    group.add(leg);
  }

  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.16), plasticMat);
  deck.position.set(-0.12, 0.26, 0.02);
  group.add(deck);
  const led = new THREE.Mesh(
    new THREE.BoxGeometry(0.015, 0.012, 0.015),
    createPS1Material({ color: "#1A3A1A", emissive: "#2AD84A", wobble: 0 }),
  );
  led.position.set(-0.04, 0.27, 0.08);
  group.add(led);
  const pad = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.06), darkMat);
  pad.position.set(0.08, 0.245, 0.08);
  group.add(pad);

  const can = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.08, 6),
    createPS1Material({ map: canTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  can.position.set(0.2, 0.27, -0.08);
  group.add(can);

  return group;
}

function createCrtCorner(x, y, z, plasticMat, darkMat, trimMat, metalMat, updaters) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = -0.42;

  const shelf = new THREE.Group();
  for (const [px, pz] of [
    [-0.28, 0.16],
    [0.28, 0.16],
    [-0.28, -0.16],
    [0.28, -0.16],
  ]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.78, 0.035), metalMat);
    post.position.set(px, 0.39, pz);
    shelf.add(post);
  }
  const plankA = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.03, 0.38), trimMat);
  plankA.position.y = 0.36;
  const plankB = plankA.clone();
  plankB.position.y = 0.08;
  const plankC = plankA.clone();
  plankC.position.y = 0.72;
  shelf.add(plankA, plankB, plankC);
  group.add(shelf);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.36), plasticMat);
  body.position.set(0, 0.94, 0);
  group.add(body);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.28, 0.04), darkMat);
  bezel.position.set(0, 0.96, 0.18);
  group.add(bezel);

  const screenMat = createPS1Material({
    map: tvGlowTexture(),
    color: "#ffffff",
    wobble: 0,
    emissive: "#2B4ACC",
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.22), screenMat);
  screen.position.set(0, 0.96, 0.205);
  group.add(screen);

  const bloom = glowPlane(0.7, 0.5, 0x6688ff, 0.62);
  bloom.position.set(0, 0.96, 0.22);
  group.add(bloom);

  const spill = glowPlane(0.58, 0.34, 0x5350a2, 0.4);
  spill.rotation.x = -Math.PI / 2;
  spill.position.set(0, 0.735, 0.12);
  group.add(spill);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.2), metalMat);
  deck.position.set(-0.1, 0.41, 0.02);
  group.add(deck);
  const ports = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.02), darkMat);
  ports.position.set(-0.1, 0.41, 0.12);
  group.add(ports);

  const brick = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.16), plasticMat);
  brick.position.set(0.14, 0.4, 0.02);
  group.add(brick);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 0.02), darkMat);
  slot.position.set(0.14, 0.41, 0.1);
  group.add(slot);

  const cable = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.7, 0.015), darkMat);
  cable.position.set(-0.22, 0.42, 0.18);
  group.add(cable);

  updaters.push((time) => {
    pulseEmissive(screenMat, 0.82 + Math.sin(time * 7.5) * 0.18);
    bloom.material.opacity = 0.42 + Math.sin(time * 7.5) * 0.1;
  });

  return group;
}

function createRecordDresser(x, y, z, plasticMat, metalMat, trimMat, darkMat, updaters) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = -1.15;

  const carcass = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.52, 0.36), plasticMat);
  carcass.position.y = 0.32;
  group.add(carcass);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 0.4), metalMat);
  frame.position.y = 0.05;
  group.add(frame);

  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.02), plasticMat);
      drawer.position.set(-0.22 + col * 0.22, 0.22 + row * 0.2, 0.185);
      group.add(drawer);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.02), metalMat);
      handle.position.set(-0.22 + col * 0.22, 0.22 + row * 0.2, 0.2);
      group.add(handle);
    }
  }

  const player = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.07, 0.26), trimMat);
  player.position.set(-0.1, 0.62, 0);
  group.add(player);

  const platter = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.01, 10),
    createPS1Material({ map: recordLabelTexture(), color: "#ffffff", wobble: 0 }),
  );
  platter.position.set(-0.1, 0.66, 0.01);
  group.add(platter);

  const ledMat = createPS1Material({ color: "#1A3A1A", emissive: "#2AD84A", wobble: 0 });
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.015, 0.02), ledMat);
  led.position.set(0.04, 0.63, 0.12);
  group.add(led);

  const ledGlow = glowPlane(0.12, 0.12, 0x44ff66, 0.55);
  ledGlow.position.set(0.04, 0.63, 0.14);
  group.add(ledGlow);

  const sleeveUpright = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.2, 0.02),
    createPS1Material({ map: vinylBusTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  sleeveUpright.position.set(0.2, 0.7, -0.04);
  sleeveUpright.rotation.y = 0.2;
  group.add(sleeveUpright);

  const sleeveFlat = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.01, 0.2),
    createPS1Material({ map: vinylWaveTexture(), color: "#ffffff", wobble: 0.002 }),
  );
  sleeveFlat.position.set(0.18, 0.585, 0.08);
  group.add(sleeveFlat);

  const sleeveBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.18, 0.015),
    createPS1Material({ map: vinylDotTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  sleeveBack.position.set(0.22, 0.68, -0.1);
  group.add(sleeveBack);

  const green = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.025, 0.16, 6),
    createPS1Material({ map: bottleGreenTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  green.position.set(-0.28, 0.66, 0.08);
  group.add(green);

  const amber = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.022, 0.12, 6),
    createPS1Material({ map: bottleAmberTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  amber.position.set(-0.22, 0.64, 0.1);
  group.add(amber);

  updaters.push((time) => {
    platter.rotation.y = time * 0.7;
    pulseEmissive(ledMat, 0.75 + Math.sin(time * 3.2) * 0.25);
    ledGlow.material.opacity = 0.4 + Math.sin(time * 3.2) * 0.15;
  });

  return group;
}

function createLavaLamp(x, y, z, plasticMat, updaters) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const lavaMap = lavaTexture();
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.28, 6),
    createPS1Material({ map: lavaMap, color: "#ffffff", emissive: "#401010", wobble: 0.004 }),
  );
  glass.position.y = 0.28;
  group.add(glass);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 6), plasticMat);
  base.position.y = 0.1;
  group.add(base);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 6), plasticMat);
  cap.position.y = 0.44;
  group.add(cap);

  const blobMat = createPS1Material({ color: "#F0A24A", emissive: "#803010", wobble: 0.008 });
  const blobA = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.04), blobMat);
  blobA.position.set(0, 0.24, 0);
  const blobB = blobA.clone();
  blobB.position.y = 0.32;
  group.add(blobA, blobB);

  const glow = glowPlane(0.28, 0.36, 0xf0a24a, 0.45);
  glow.position.set(0.06, 0.28, 0);
  group.add(glow);

  updaters.push((time) => {
    blobA.position.y = 0.22 + Math.sin(time * 0.7) * 0.05;
    blobB.position.y = 0.34 + Math.sin(time * 0.7 + 1.4) * 0.04;
    pulseEmissive(blobMat, 0.8 + Math.sin(time * 1.6) * 0.25);
    glow.material.opacity = 0.32 + Math.sin(time * 1.6) * 0.1;
  });

  return group;
}

function createWarmLamp(x, y, z, trimMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.14), beigeMat);
  base.position.y = 0.03;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.42, 0.03), trimMat);
  pole.position.y = 0.25;
  group.add(pole);
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.1, 0.12, 6, 1, true),
    createPS1Material({ color: "#E8C878", emissive: "#403010", wobble: 0.003 }),
  );
  shade.position.y = 0.5;
  group.add(shade);
  const glow = glowPlane(0.28, 0.28, 0xf89d09, 0.28);
  glow.rotation.x = -Math.PI / 2;
  glow.position.set(0, 0.52, 0);
  group.add(glow);
  return group;
}

function createSlidingGlass(x, y, z, trimMat, shojiMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const jambL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.82, 0.07), trimMat);
  jambL.position.set(0.04, 0, -0.7);
  const jambR = jambL.clone();
  jambR.position.z = 0.7;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 1.48), trimMat);
  head.position.set(0.04, 0.88, 0);
  const track = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 1.48), trimMat);
  track.position.set(0.06, -0.88, 0);
  group.add(jambL, jambR, head, track);

  const outside = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.72),
    new THREE.MeshBasicMaterial({ map: outsideTexture() }),
  );
  outside.rotation.y = Math.PI / 2;
  outside.position.set(-0.22, 0.02, 0);
  group.add(outside);

  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.28, 1.6),
    new THREE.MeshBasicMaterial({
      color: 0xf89d09,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    }),
  );
  pane.rotation.y = Math.PI / 2;
  pane.position.set(0.02, 0.02, 0);
  group.add(pane);

  const shojiClosed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.58, 0.52), shojiMat);
  shojiClosed.position.set(0.08, 0.02, -0.42);
  group.add(shojiClosed);

  const shojiOpen = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.58, 0.28), shojiMat);
  shojiOpen.position.set(0.1, 0.02, 0.58);
  group.add(shojiOpen);

  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.58, 0.04), trimMat);
  rail.position.set(0.05, 0.02, 0.08);
  group.add(rail);

  return group;
}

function createDoor(x, y, z, trimMat, plasticMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.7, 0.06), plasticMat);
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

function createPosters(trimMat) {
  const group = new THREE.Group();

  const note = new THREE.Mesh(
    new THREE.PlaneGeometry(0.28, 0.28),
    createPS1Material({ map: notePosterTexture(), color: "#ffffff", wobble: 0.002 }),
  );
  note.position.set(-0.55, 1.55, -ROOM.halfD + 0.08);
  group.add(note);

  const night = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.32),
    createPS1Material({ map: nightPosterTexture(), color: "#ffffff", wobble: 0.002 }),
  );
  night.position.set(0.22, 1.58, -ROOM.halfD + 0.08);
  group.add(night);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, 0.03), trimMat);
  frame.position.set(ROOM.halfW - 0.09, 1.42, 0.42);
  frame.rotation.y = -Math.PI / 2;
  group.add(frame);

  const mountain = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.3),
    createPS1Material({ map: mountainPosterTexture(), color: "#ffffff", wobble: 0.002 }),
  );
  mountain.position.set(ROOM.halfW - 0.11, 1.42, 0.42);
  mountain.rotation.y = -Math.PI / 2;
  group.add(mountain);

  return group;
}

function createHangingBag(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const hook = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.04, 0.03),
    createPS1Material({ color: "#6A5A48", wobble: 0.002 }),
  );
  hook.position.y = 0.16;
  group.add(hook);
  const bag = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.16, 0.05),
    createPS1Material({ map: bagTexture(), color: "#ffffff", wobble: 0.005 }),
  );
  group.add(bag);
  return group;
}

export function tickRoom(room, time) {
  room.userData.update?.(time);
}
