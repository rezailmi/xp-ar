import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { replyTo } from "./replies.js";

const CSS_SCALE = 0.0054;

export function createTalkSurface() {
  const balloonEl = document.getElementById("talk-balloon");
  const form = document.getElementById("talk-form");
  const input = document.getElementById("talk-input");
  const echo = document.getElementById("reply-echo");
  const line = document.getElementById("reply-line");

  const balloon = new CSS3DObject(balloonEl);
  balloon.scale.setScalar(CSS_SCALE);
  balloon.position.set(0.72, 1.78, 0.28);

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

export function billboardBalloon(camera, balloon) {
  balloon.quaternion.copy(camera.quaternion);
}
