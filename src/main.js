import * as THREE from "three";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { createControls } from "./controls.js";
import { tickPS1Materials } from "./ps1-material.js";
import { createRoom, createSky } from "./room.js";
import { createRover } from "./rover.js";
import { billboardWindows, createTalkSurface } from "./talk.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.getElementById("gl");
const cssHost = document.getElementById("css3d");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setClearColor(0x7ec8e3, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const cssRenderer = new CSS3DRenderer();
cssRenderer.domElement.style.pointerEvents = "none";
cssHost.appendChild(cssRenderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xc5e4f3, 18, 72);

const cssScene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
camera.position.set(0.55, 1.55, 4.15);

const lookTarget = new THREE.Vector3(0.15, 0.85, 0.2);

scene.add(createSky());
scene.add(createRoom());

const rover = createRover();
rover.position.set(0.2, 0, 0.05);
scene.add(rover);

const { talk, reply, input } = createTalkSurface();
cssScene.add(talk, reply);

const controls = createControls(camera, canvas, lookTarget);

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
  rover.userData.update(time, reduceMotion);
  tickPS1Materials(time, {
    wobble: !reduceMotion,
    snap: reduceMotion ? 2000 : 168,
  });
  billboardWindows(camera, talk, reply);

  renderer.render(scene, camera);
  cssRenderer.render(cssScene, camera);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.setTimeout(() => {
  if (!reduceMotion) input.focus();
}, 200);
