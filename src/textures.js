import * as THREE from "three";

function canvasTexture(size, paint) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  paint(ctx, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function grassTexture() {
  return canvasTexture(128, (ctx, size) => {
    ctx.fillStyle = "#3B7A2A";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 900; i += 1) {
      const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const y = (Math.sin(i * 78.233) * 12345.678) % 1;
      const px = Math.abs(x) * size;
      const py = Math.abs(y) * size;
      ctx.fillStyle = i % 7 === 0 ? "#6B9B3A" : i % 11 === 0 ? "#2F641F" : "#4A8A30";
      ctx.fillRect(px, py, 2, 2);
    }
    ctx.fillStyle = "#C9B44A";
    for (let i = 0; i < 18; i += 1) {
      ctx.fillRect((i * 17) % size, (i * 29) % size, 1, 1);
    }
  });
}

export function furTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#C9A227";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if ((x + y * 3) % 5 === 0) {
          ctx.fillStyle = "#A7841C";
          ctx.fillRect(x, y, 1, 1);
        } else if ((x * 7 + y) % 11 === 0) {
          ctx.fillStyle = "#E0C15A";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

export function woodTexture() {
  return canvasTexture(64, (ctx, size) => {
    for (let y = 0; y < size; y += 1) {
      const stripe = y % 16 < 14 ? "#8A5A2B" : "#6B4220";
      ctx.fillStyle = stripe;
      ctx.fillRect(0, y, size, 1);
      if (y % 16 === 0) {
        ctx.fillStyle = "#4A2C14";
        ctx.fillRect(0, y, size, 1);
      }
    }
    ctx.fillStyle = "#C4A36A";
    ctx.fillRect(6, 8, 2, 10);
    ctx.fillRect(40, 28, 2, 12);
    ctx.fillStyle = "#2A1810";
    ctx.font = "9px Tahoma, sans-serif";
    ctx.fillText("FRAGILE", 6, 38);
  });
}

export function crtTexture() {
  return canvasTexture(64, (ctx, size) => {
    const sky = ctx.createLinearGradient(0, 0, 0, size);
    sky.addColorStop(0, "#7EC8E3");
    sky.addColorStop(1, "#C5E4F3");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#3B7A2A";
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.quadraticCurveTo(28, 22, 64, 44);
    ctx.lineTo(64, 64);
    ctx.lineTo(0, 64);
    ctx.fill();
    ctx.fillStyle = "#6B9B3A";
    ctx.beginPath();
    ctx.moveTo(0, 56);
    ctx.quadraticCurveTo(20, 40, 40, 58);
    ctx.lineTo(0, 64);
    ctx.fill();
    ctx.fillStyle = "#111111";
    ctx.fillRect(2, 2, 18, 3);
    ctx.fillRect(2, 6, 10, 2);
  });
}

export function plasticTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#D4D0C8";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#ECE9D8";
    ctx.fillRect(0, 0, size, 8);
    ctx.fillStyle = "#B4B0A4";
    for (let i = 0; i < size; i += 8) {
      ctx.fillRect(i, 20, 3, size);
    }
  });
}
