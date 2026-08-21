import * as THREE from "three";
import { createPS1Material, pulseEmissive } from "./ps1-material.js";
import {
  bagTexture,
  bottleAmberTexture,
  bottleGreenTexture,
  canTexture,
  cookerPanelTexture,
  curtainTexture,
  floorTexture,
  glowTexture,
  metalTexture,
  mountainPosterTexture,
  nightPosterTexture,
  noodleTexture,
  notePosterTexture,
  outsideTexture,
  plasterTexture,
  recordLabelTexture,
  rugTexture,
  shadeTexture,
  sofaTexture,
  steamTexture,
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
  cam: { x: 1.42, z: 1.32, yMin: 0.38, yMax: 1.72 },
  walk: { x: 1.05, zMin: -0.15, zMax: 1.12 },
};

export function createRoom() {
  const room = new THREE.Group();
  room.name = "LivingRoom";
  const updaters = [];

  const wallpaper = plasterTexture();
  wallpaper.wrapS = THREE.RepeatWrapping;
  wallpaper.wrapT = THREE.RepeatWrapping;
  wallpaper.repeat.set(2.2, 1.5);
  const wallMat = createPS1Material({ map: wallpaper, color: "#ffffff", wobble: 0.004 });

  const floorMap = floorTexture();
  floorMap.wrapS = THREE.RepeatWrapping;
  floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set(3, 3);
  const floorMat = createPS1Material({ map: floorMap, color: "#ffffff", wobble: 0.003 });
  const trimMat = createPS1Material({ map: woodTrimTexture(), color: "#ffffff", wobble: 0.005 });
  const sofaMat = createPS1Material({ map: sofaTexture(), color: "#ffffff", wobble: 0.006 });
  const plasticMat = createPS1Material({ map: whitePlasticTexture(), color: "#ffffff", wobble: 0.004 });
  const metalMat = createPS1Material({ map: metalTexture(), color: "#ffffff", wobble: 0.003 });
  const shadeMat = createPS1Material({ map: shadeTexture(), color: "#ffffff", wobble: 0.005 });
  const darkMat = createPS1Material({ color: "#1A1816", wobble: 0.003 });
  const curtainMat = createPS1Material({
    map: curtainTexture(),
    color: "#ffffff",
    wobble: 0.004,
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
    createPS1Material({ color: "#D8D0C0", wobble: 0.002 }),
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

  const rug = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.03, 1.08),
    createPS1Material({ map: rugTexture(), color: "#ffffff", wobble: 0.005 }),
  );
  rug.position.set(0.02, 0.02, 0.18);
  room.add(rug);

  room.add(createSofa(0.04, 0, -1.02, sofaMat, trimMat));
  room.add(createSideTable(-1.28, 0, -0.62, trimMat, metalMat, plasticMat, darkMat, updaters));
  room.add(createCrtCorner(1.16, 0, -0.82, plasticMat, darkMat, trimMat, metalMat, updaters));
  room.add(createRecordDresser(1.2, 0, 0.42, plasticMat, metalMat, trimMat, darkMat, updaters));
  room.add(createLamp(-1.2, 0, 0.62, trimMat, shadeMat, plasticMat));
  room.add(createWindow(-ROOM.halfW + 0.01, 1.3, -0.22, trimMat, curtainMat));
  room.add(createDoor(0.85, 0, ROOM.halfD - 0.02, trimMat, plasticMat));
  room.add(createPosters(trimMat));
  room.add(createHangingBag(-ROOM.halfW + 0.1, 1.05, 0.72));

  const sunFloor = glowPlane(1.15, 0.82, 0xffe08a, 0.42);
  sunFloor.rotation.x = -Math.PI / 2;
  sunFloor.position.set(-0.42, 0.036, 0.08);
  room.add(sunFloor);

  const sunWall = glowPlane(0.55, 1.15, 0xffc878, 0.38);
  sunWall.rotation.y = Math.PI / 2;
  sunWall.position.set(-ROOM.halfW + 0.09, 1.15, -0.18);
  room.add(sunWall);

  const coolCorner = glowPlane(0.7, 0.9, 0x6a7ab0, 0.12);
  coolCorner.position.set(0.2, 1.35, -ROOM.halfD + 0.08);
  room.add(coolCorner);

  const lampGlow = glowPlane(0.55, 0.55, 0xffd89a, 0.28);
  lampGlow.rotation.x = -Math.PI / 2;
  lampGlow.position.set(-1.2, 1.28, 0.62);
  room.add(lampGlow);

  room.userData.update = (time) => {
    for (const update of updaters) update(time);
  };

  return room;
}

function leftWallWithHole(wallMat, h, d) {
  const group = new THREE.Group();
  const x = -ROOM.halfW - 0.06;
  const winZ0 = -0.78;
  const winZ1 = 0.32;
  const winY0 = 0.86;
  const winY1 = 1.76;

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

function createSofa(x, y, z, sofaMat, trimMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const rail = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.08, 0.64), trimMat);
  rail.position.set(0, 0.2, 0.04);
  group.add(rail);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.16, 0.56), sofaMat);
  seat.position.set(0, 0.3, 0.06);
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.46, 0.14), sofaMat);
  back.position.set(0, 0.54, -0.22);
  group.add(back);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.56), trimMat);
  armL.position.set(-0.74, 0.4, 0.06);
  const armR = armL.clone();
  armR.position.x = 0.74;
  group.add(armL, armR);

  const cushionL = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 0.44), sofaMat);
  cushionL.position.set(-0.32, 0.4, 0.1);
  const cushionR = cushionL.clone();
  cushionR.position.x = 0.32;
  group.add(cushionL, cushionR);

  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.08),
    createPS1Material({ color: "#8A4030", wobble: 0.006 }),
  );
  pillow.position.set(-0.58, 0.5, -0.08);
  pillow.rotation.y = 0.25;
  group.add(pillow);

  for (const [fx, fz] of [
    [-0.68, 0.24],
    [0.68, 0.24],
    [-0.68, -0.16],
    [0.68, -0.16],
  ]) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.07), trimMat);
    foot.position.set(fx, 0.08, fz);
    group.add(foot);
  }

  return group;
}

function createSideTable(x, y, z, trimMat, metalMat, plasticMat, darkMat, updaters) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const top = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.36), trimMat);
  top.position.y = 0.42;
  group.add(top);
  for (const [lx, lz] of [
    [-0.18, 0.13],
    [0.18, 0.13],
    [-0.18, -0.13],
    [0.18, -0.13],
  ]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.4, 0.04), metalMat);
    leg.position.set(lx, 0.2, lz);
    group.add(leg);
  }

  const cooker = new THREE.Group();
  cooker.position.set(-0.08, 0.52, -0.02);
  const pot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.2), plasticMat);
  pot.position.y = 0.07;
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.05, 6), plasticMat);
  lid.position.y = 0.16;
  const knob = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), darkMat);
  knob.position.y = 0.2;
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.05, 0.01),
    createPS1Material({ map: cookerPanelTexture(), color: "#ffffff", wobble: 0 }),
  );
  panel.position.set(0, 0.07, 0.105);
  cooker.add(pot, lid, knob, panel);
  group.add(cooker);

  const burner = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.03, 0.16),
    createPS1Material({ color: "#2A2A30", emissive: "#141428", wobble: 0.002 }),
  );
  burner.position.set(0.12, 0.445, 0.04);
  group.add(burner);

  const ring = glowPlane(0.2, 0.2, 0x6688ff, 0.45);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0.12, 0.462, 0.04);
  group.add(ring);

  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.045, 0.05, 8),
    createPS1Material({ color: "#C4A070", wobble: 0.004 }),
  );
  bowl.position.set(0.12, 0.492, 0.04);
  group.add(bowl);

  const noodles = new THREE.Mesh(
    new THREE.CircleGeometry(0.045, 8),
    createPS1Material({ map: noodleTexture(), color: "#ffffff", wobble: 0 }),
  );
  noodles.rotation.x = -Math.PI / 2;
  noodles.position.set(0.12, 0.518, 0.04);
  group.add(noodles);

  const steams = [];
  const steamMap = steamTexture();
  for (let i = 0; i < 3; i += 1) {
    const puff = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, 0.1),
      new THREE.MeshBasicMaterial({
        map: steamMap,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    puff.position.set(0.1 + i * 0.02, 0.56, 0.04);
    puff.userData.baseY = 0.56;
    puff.userData.phase = i * 0.8;
    group.add(puff);
    steams.push(puff);
  }

  const can = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.08, 6),
    createPS1Material({ map: canTexture(), color: "#ffffff", wobble: 0.003 }),
  );
  can.position.set(-0.16, 0.48, 0.1);
  group.add(can);

  updaters.push((time) => {
    for (const puff of steams) {
      const t = (time * 0.18 + puff.userData.phase) % 1;
      puff.position.y = puff.userData.baseY + t * 0.16;
      puff.material.opacity = 0.5 * (1 - t);
      puff.rotation.y = time * 0.4 + puff.userData.phase;
    }
  });

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
    emissive: "#3A2A78",
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.22), screenMat);
  screen.position.set(0, 0.96, 0.205);
  group.add(screen);

  const bloom = glowPlane(0.62, 0.44, 0xd8c8ff, 0.55);
  bloom.position.set(0, 0.96, 0.22);
  group.add(bloom);

  const spill = glowPlane(0.5, 0.28, 0xc8b8ff, 0.32);
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

function createLamp(x, y, z, trimMat, shadeMat, beigeMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.2), beigeMat);
  base.position.y = 0.03;
  group.add(base);
  const pole = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.02, 0.04), trimMat);
  pole.position.y = 0.54;
  group.add(pole);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.2, 0.24, 6, 1, true), shadeMat);
  shade.position.y = 1.1;
  group.add(shade);
  const shadeTop = new THREE.Mesh(new THREE.CircleGeometry(0.11, 6), shadeMat);
  shadeTop.rotation.x = -Math.PI / 2;
  shadeTop.position.y = 1.22;
  group.add(shadeTop);
  const bulb = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 0.05),
    createPS1Material({ color: "#FFF2C4", emissive: "#806020", wobble: 0 }),
  );
  bulb.position.y = 1.02;
  group.add(bulb);
  return group;
}

function createWindow(x, y, z, trimMat, curtainMat) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const jambL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.96, 0.08), trimMat);
  jambL.position.set(0.04, 0, -0.52);
  const jambR = jambL.clone();
  jambR.position.z = 0.52;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.12), trimMat);
  head.position.set(0.04, 0.48, 0);
  const sill = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.07, 1.16), trimMat);
  sill.position.set(0.08, -0.48, 0);
  group.add(jambL, jambR, head, sill);

  const outside = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.88),
    new THREE.MeshBasicMaterial({ map: outsideTexture() }),
  );
  outside.rotation.y = Math.PI / 2;
  outside.position.set(-0.2, 0.02, 0);
  group.add(outside);

  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 0.8),
    new THREE.MeshBasicMaterial({
      color: 0xffe6a0,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    }),
  );
  pane.rotation.y = Math.PI / 2;
  pane.position.set(0.03, 0.02, 0);
  group.add(pane);

  const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.8, 0.04), trimMat);
  mullion.position.set(0.03, 0.02, 0);
  group.add(mullion);

  const curtainL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.88, 0.18), curtainMat);
  curtainL.position.set(0.07, 0.02, -0.42);
  const curtainR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.88, 0.14), curtainMat);
  curtainR.position.set(0.07, 0.02, 0.44);
  group.add(curtainL, curtainR);

  const valance = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 1.12), curtainMat);
  valance.position.set(0.08, 0.46, 0);
  group.add(valance);

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
