export function createControls(camera, canvas, target) {
  const state = {
    theta: Math.atan2(camera.position.x - target.x, camera.position.z - target.z),
    phi: Math.acos(
      clamp((camera.position.y - target.y) / camera.position.distanceTo(target), -1, 1),
    ),
    radius: camera.position.distanceTo(target),
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    keys: new Set(),
  };

  const onPointerDown = (event) => {
    if (event.target.closest(".xp-window")) return;
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.theta -= dx * 0.005;
    state.phi = clamp(state.phi - dy * 0.005, 0.18, 1.35);
  };

  const onPointerUp = (event) => {
    if (event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
  };

  const onWheel = (event) => {
    event.preventDefault();
    state.radius = clamp(state.radius + event.deltaY * 0.01, 2.2, 12);
  };

  const onKeyDown = (event) => {
    if (event.target instanceof HTMLInputElement) return;
    state.keys.add(event.code);
  };

  const onKeyUp = (event) => {
    state.keys.delete(event.code);
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return {
    update(dt) {
      const speed = 1.7 * dt;
      const forward = newDir(state.theta);
      const right = { x: forward.z, z: -forward.x };
      if (state.keys.has("KeyW")) {
        target.x += forward.x * speed;
        target.z += forward.z * speed;
      }
      if (state.keys.has("KeyS")) {
        target.x -= forward.x * speed;
        target.z -= forward.z * speed;
      }
      if (state.keys.has("KeyA")) {
        target.x -= right.x * speed;
        target.z -= right.z * speed;
      }
      if (state.keys.has("KeyD")) {
        target.x += right.x * speed;
        target.z += right.z * speed;
      }
      target.x = clamp(target.x, -8, 8);
      target.z = clamp(target.z, -8, 6);

      camera.position.x = target.x + Math.sin(state.theta) * Math.sin(state.phi) * state.radius;
      camera.position.z = target.z + Math.cos(state.theta) * Math.sin(state.phi) * state.radius;
      camera.position.y = target.y + Math.cos(state.phi) * state.radius;
      camera.lookAt(target);
    },
  };
}

function newDir(theta) {
  return { x: Math.sin(theta), z: Math.cos(theta) };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
