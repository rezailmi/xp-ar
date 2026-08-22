import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { replyTo } from "./replies.js";

const CSS_SCALE = 0.0042;
const headWorld = new THREE.Vector3();

export function createTalkSurface() {
  const balloonEl = document.getElementById("talk-balloon");
  const form = document.getElementById("talk-form");
  const input = document.getElementById("talk-input");
  const echo = document.getElementById("reply-echo");
  const line = document.getElementById("reply-line");

  const balloon = new CSS3DObject(balloonEl);
  balloon.scale.setScalar(CSS_SCALE);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = replyTo(input.value);
    echo.textContent = next.echo;
    line.textContent = next.line;
    input.value = "";
    input.focus();
  });

  return { balloon, input };
}

export function tapeBalloon(camera, balloon, head) {
  head.getWorldPosition(headWorld);
  balloon.position.set(headWorld.x + 0.2, headWorld.y + 0.14, headWorld.z + 0.05);
  balloon.quaternion.copy(camera.quaternion);
}
