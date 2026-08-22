import * as THREE from "three";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { createControls } from "./controls.js";
import { createTalkCursor } from "./cursor.js";
import { createPips } from "./pips.js";
import { tickPS1Materials } from "./ps1-material.js";
import { ROOM, createRoom, tickRoom } from "./room.js";
import { createTalkSurface, tapeBalloon } from "./talk.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.getElementById("gl");
const cssHost = document.getElementById("css3d");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(0.7);
renderer.setClearColor(0x130e1f, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const cssRenderer = new CSS3DRenderer();
cssRenderer.domElement.style.pointerEvents = "none";
cssHost.appendChild(cssRenderer.domElement);

const scene = new THREE.Scene();
const cssScene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(64, 1, 0.08, 12);
const lookTarget = new THREE.Vector3(-0.16, 0.2, -0.02);
const shot = new URLSearchParams(window.location.search).get("shot");

if (shot === "close") {
  camera.position.set(0.18, 0.24, 0.22);
  lookTarget.set(-0.16, 0.17, -0.06);
} else {
  camera.position.set(0.28, 0.46, 1.12);
}

const room = createRoom();
scene.add(room);

const pips = createPips();
pips.position.set(-0.16, 0.07, -0.08);
pips.rotation.y = -1.12;
pips.userData.seatY = 0.07;
scene.add(pips);

if (shot === "close") {
  const balloonEl = document.getElementById("talk-balloon");
  if (balloonEl) balloonEl.hidden = true;
}

const talkCursor = createTalkCursor();
scene.add(talkCursor);

const { balloon, input } = createTalkSurface();
cssScene.add(balloon);

const controls = createControls(camera, canvas, lookTarget, {
  minRadius: 0.34,
  maxRadius: 1.7,
  minPhi: 0.88,
  maxPhi: 1.48,
  lookSpeed: 0.0022,
  walkSpeed: 0.55,
  walk: ROOM.walk,
  cam: ROOM.cam,
});

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  cssRenderer.setSize(width, height);
}

window.addEventListener("resize", resize);
resize();
camera.lookAt(lookTarget);

let last = performance.now();

function frame(now) {
  const time = now * 0.001;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  controls.update(dt);
  pips.userData.update(time, reduceMotion);
  talkCursor.userData.update(time, pips.userData.head, reduceMotion);
  tickRoom(room, time);
  tickPS1Materials(time, {
    wobble: !reduceMotion,
    snap: reduceMotion ? 2000 : 148,
  });
  tapeBalloon(camera, balloon, pips.userData.balloonAnchor ?? pips.userData.head);

  renderer.render(scene, camera);
  cssRenderer.render(cssScene, camera);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.setTimeout(() => {
  if (!reduceMotion) input.focus();
}, 200);
