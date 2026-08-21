export function createControls(camera, canvas, target, options = {}) {
  const minRadius = options.minRadius ?? 0.9;
  const maxRadius = options.maxRadius ?? 1.7;
  const minPhi = options.minPhi ?? 0.62;
  const maxPhi = options.maxPhi ?? 1.18;
  const lookSpeed = options.lookSpeed ?? 0.0035;
  const walkSpeed = options.walkSpeed ?? 0.75;
  const walk = options.walk ?? { x: 1, zMin: -0.2, zMax: 1.1 };
  const camBox = options.cam ?? { x: 1.4, z: 1.3, yMin: 0.42, yMax: 1.88 };

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
    if (event.target.closest(".balloon")) return;
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
    state.theta -= dx * lookSpeed;
    state.phi = clamp(state.phi - dy * lookSpeed, minPhi, maxPhi);
  };

  const onPointerUp = (event) => {
    if (event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
  };

  const onWheel = (event) => {
    event.preventDefault();
    state.radius = clamp(state.radius + event.deltaY * 0.008, minRadius, maxRadius);
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
      const speed = walkSpeed * dt;
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
      target.x = clamp(target.x, -walk.x, walk.x);
      target.z = clamp(target.z, walk.zMin, walk.zMax);
      target.y = clamp(target.y, 0.48, 0.92);

      let radius = state.radius;
      for (let i = 0; i < 8; i += 1) {
        camera.position.x = target.x + Math.sin(state.theta) * Math.sin(state.phi) * radius;
        camera.position.z = target.z + Math.cos(state.theta) * Math.sin(state.phi) * radius;
        camera.position.y = target.y + Math.cos(state.phi) * radius;
        const inside =
          Math.abs(camera.position.x) <= camBox.x &&
          Math.abs(camera.position.z) <= camBox.z &&
          camera.position.y >= camBox.yMin &&
          camera.position.y <= camBox.yMax;
        if (inside) break;
        radius = Math.max(minRadius, radius - 0.08);
      }

      camera.position.x = clamp(camera.position.x, -camBox.x, camBox.x);
      camera.position.z = clamp(camera.position.z, -camBox.z, camBox.z);
      camera.position.y = clamp(camera.position.y, camBox.yMin, camBox.yMax);
      state.radius = radius;
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
