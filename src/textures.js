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

export function wallpaperTexture() {
  return canvasTexture(128, (ctx, size) => {
    ctx.fillStyle = "#C4A882";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#B39168";
    for (let y = 0; y < size; y += 16) {
      for (let x = 0; x < size; x += 16) {
        ctx.fillRect(x + 7, y + 2, 2, 12);
        ctx.fillRect(x + 2, y + 7, 12, 2);
      }
    }
    ctx.fillStyle = "#A07C55";
    for (let i = 0; i < 40; i += 1) {
      ctx.fillRect((i * 19) % size, (i * 27) % size, 2, 2);
    }
  });
}

export function floorTexture() {
  return canvasTexture(128, (ctx, size) => {
    for (let y = 0; y < size; y += 1) {
      ctx.fillStyle = y % 16 < 14 ? "#8A6238" : "#6B4A2A";
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#5A3C22";
    for (let x = 0; x < size; x += 32) {
      ctx.fillRect(x, 0, 1, size);
    }
    ctx.fillStyle = "#C4A882";
    ctx.fillRect(10, 20, 2, 8);
    ctx.fillRect(70, 90, 2, 6);
  });
}

export function rugTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#4A1C1C";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#7A2E2E";
    ctx.fillRect(6, 6, size - 12, size - 12);
    ctx.fillStyle = "#9A3E3E";
    ctx.fillRect(20, 20, 24, 24);
    ctx.fillStyle = "#C4A882";
    ctx.fillRect(30, 30, 4, 4);
  });
}

export function sofaTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#3A4A6B";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#2E3C58";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#4A5C80";
    ctx.fillRect(8, 8, 6, 6);
    ctx.fillRect(40, 28, 6, 6);
  });
}

export function woodTrimTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#6B4A2A";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#8A6238";
    for (let y = 4; y < size; y += 8) {
      ctx.fillRect(0, y, size, 2);
    }
    ctx.fillStyle = "#4A3018";
    ctx.fillRect(0, 0, size, 1);
  });
}

export function crtBeigeTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#D8D0B8";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E8E0C8";
    ctx.fillRect(0, 0, size, 10);
    ctx.fillStyle = "#B8B09A";
    for (let i = 0; i < size; i += 8) {
      ctx.fillRect(i, 16, 2, size);
    }
  });
}

export function tvSnowTexture() {
  return canvasTexture(64, (ctx, size) => {
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const n = ((x * 13 + y * 31) % 7) / 7;
        ctx.fillStyle = n > 0.55 ? "#D8D0B8" : n > 0.3 ? "#6B4A2A" : "#111111";
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = "#7A2E2E";
    ctx.fillRect(4, 26, 10, 12);
    ctx.fillStyle = "#3A4A6B";
    ctx.fillRect(18, 26, 10, 12);
    ctx.fillStyle = "#C4A882";
    ctx.fillRect(32, 26, 10, 12);
    ctx.fillStyle = "#FFF4A3";
    ctx.fillRect(46, 26, 10, 12);
  });
}

export function shadeTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#D8D0B8";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C4A882";
    for (let y = 0; y < size; y += 6) {
      ctx.fillRect(0, y, size, 2);
    }
  });
}

export function pipsFurTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#C86A2A";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if ((x + y * 2) % 6 === 0) {
          ctx.fillStyle = "#A85420";
          ctx.fillRect(x, y, 1, 1);
        } else if ((x * 5 + y) % 9 === 0) {
          ctx.fillStyle = "#E08A40";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

export function gauntletTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8D8B0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#6B4A2A";
    ctx.fillRect(0, 12, size, 4);
    ctx.fillStyle = "#C4A882";
    ctx.fillRect(4, 4, 6, 6);
  });
}

export function sneakerTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E8D8B0";
    ctx.fillRect(0, 0, size, 8);
    ctx.fillStyle = "#4A3B12";
    ctx.fillRect(0, 24, size, 8);
    ctx.fillStyle = "#111111";
    ctx.fillRect(20, 10, 4, 8);
  });
}
