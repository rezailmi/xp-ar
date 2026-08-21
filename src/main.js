import * as THREE from "three";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { createControls } from "./controls.js";
import { createPips } from "./pips.js";
import { tickPS1Materials } from "./ps1-material.js";
import { ROOM, createRoom } from "./room.js";
import { createTalkSurface, tapeBalloon } from "./talk.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.getElementById("gl");
const cssHost = document.getElementById("css3d");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setClearColor(0xc4a882, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const cssRenderer = new CSS3DRenderer();
cssRenderer.domElement.style.pointerEvents = "none";
cssHost.appendChild(cssRenderer.domElement);

const scene = new THREE.Scene();
const cssScene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 1, 0.08, 12);
camera.position.set(0.18, 1.28, 1.18);

const lookTarget = new THREE.Vector3(0.12, 0.72, -0.7);

scene.add(createRoom());

const pips = createPips();
pips.position.set(0.32, 0.5, -0.88);
pips.userData.seatY = 0.5;
scene.add(pips);

const { balloon, input } = createTalkSurface();
cssScene.add(balloon);

const controls = createControls(camera, canvas, lookTarget, {
  minRadius: 0.85,
  maxRadius: 1.55,
  minPhi: 0.64,
  maxPhi: 1.16,
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
  tickPS1Materials(time, {
    wobble: !reduceMotion,
    snap: reduceMotion ? 2000 : 168,
  });
  tapeBalloon(camera, balloon, pips.userData.head);

  renderer.render(scene, camera);
  cssRenderer.render(cssScene, camera);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.setTimeout(() => {
  if (!reduceMotion) input.focus();
}, 200);
