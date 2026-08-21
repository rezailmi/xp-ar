import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { replyTo } from "./replies.js";

const CSS_SCALE = 0.01;

export function createTalkSurface() {
  const talkEl = document.getElementById("talk-window");
  const replyEl = document.getElementById("reply-window");
  const form = document.getElementById("talk-form");
  const input = document.getElementById("talk-input");
  const echo = document.getElementById("reply-echo");
  const line = document.getElementById("reply-line");

  const talk = new CSS3DObject(talkEl);
  talk.scale.setScalar(CSS_SCALE);
  talk.position.set(-1.42, 1.08, 1.35);

  const reply = new CSS3DObject(replyEl);
  reply.scale.setScalar(CSS_SCALE);
  reply.position.set(1.05, 1.62, 0.55);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = replyTo(input.value);
    echo.textContent = next.echo;
    line.textContent = next.line;
    input.value = "";
    input.focus();
  });

  return { talk, reply, input };
}

export function billboardWindows(camera, talk, reply) {
  talk.quaternion.copy(camera.quaternion);
  reply.quaternion.copy(camera.quaternion);
}
