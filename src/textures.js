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
    ctx.fillStyle = "#2EC4B6";
    ctx.fillRect(0, 0, size, size);
    const dots = ["#FFF4A3", "#FF7A1A", "#C9A8F0", "#B6E04A"];
    for (let y = 2; y < size; y += 14) {
      for (let x = 2; x < size; x += 14) {
        ctx.fillStyle = dots[Math.floor((x + y) / 14) % dots.length];
        ctx.fillRect(x, y, 8, 8);
      }
    }
  });
}

export function floorTexture() {
  return canvasTexture(128, (ctx, size) => {
    for (let y = 0; y < size; y += 1) {
      ctx.fillStyle = y % 16 < 14 ? "#D08A3A" : "#8B4E24";
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#6B3A18";
    for (let x = 0; x < size; x += 32) {
      ctx.fillRect(x, 0, 1, size);
    }
  });
}

export function rugTexture() {
  return canvasTexture(64, (ctx, size) => {
    for (let y = 0; y < size; y += 8) {
      for (let x = 0; x < size; x += 8) {
        ctx.fillStyle = (x + y) % 16 === 0 ? "#FF7A1A" : "#FFE14A";
        ctx.fillRect(x, y, 8, 8);
      }
    }
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, size - 4, size - 4);
  });
}

export function sofaTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#2A4DE0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#1E3AB8";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#4A6CFF";
    ctx.fillRect(10, 10, 8, 8);
    ctx.fillRect(40, 30, 8, 8);
  });
}

export function woodTrimTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#8B4E24";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C47A32";
    for (let y = 4; y < size; y += 8) {
      ctx.fillRect(0, y, size, 2);
    }
    ctx.fillStyle = "#6B3A18";
    ctx.fillRect(0, 0, size, 1);
  });
}

export function crtBeigeTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#F2E6C4";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#B6E04A";
    ctx.fillRect(0, 0, size, 10);
    ctx.fillStyle = "#E23B2C";
    ctx.fillRect(48, 20, 10, 10);
    ctx.fillStyle = "#2A4DE0";
    ctx.fillRect(48, 36, 10, 10);
  });
}

export function tvSnowTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#7EC8E3";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E23B2C";
    ctx.fillRect(4, 20, 14, 24);
    ctx.fillStyle = "#2A4DE0";
    ctx.fillRect(20, 20, 14, 24);
    ctx.fillStyle = "#B6E04A";
    ctx.fillRect(36, 20, 14, 24);
    ctx.fillStyle = "#FFF4A3";
    ctx.fillRect(52, 20, 8, 24);
  });
}

export function shadeTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#B6E04A";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#FFF4A3";
    for (let y = 0; y < size; y += 6) {
      ctx.fillRect(0, y, size, 2);
    }
  });
}

export function outsideTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#7EC8E3";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#5BB8D8";
    ctx.fillRect(0, 0, size, 18);
    ctx.fillStyle = "#6B9B3A";
    ctx.fillRect(0, 48, size, 16);
    ctx.fillStyle = "#FF8BA0";
    ctx.fillRect(40, 22, 18, 28);
    ctx.fillStyle = "#FFF4A3";
    ctx.fillRect(44, 26, 6, 6);
    ctx.fillStyle = "#8B4E24";
    ctx.fillRect(14, 36, 6, 16);
    ctx.fillStyle = "#3B7A2A";
    ctx.fillRect(6, 22, 22, 16);
    ctx.fillRect(10, 16, 14, 10);
  });
}

export function curtainTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E23B2C";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#FF7A1A";
    for (let x = 0; x < size; x += 6) {
      ctx.fillRect(x, 0, 2, size);
    }
  });
}

export function pipsFurTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#E07A28";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if ((x + y * 2) % 6 === 0) {
          ctx.fillStyle = "#C45E18";
          ctx.fillRect(x, y, 1, 1);
        } else if ((x * 5 + y) % 9 === 0) {
          ctx.fillStyle = "#FF9A40";
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
    ctx.fillStyle = "#2A4DE0";
    ctx.fillRect(0, 12, size, 4);
    ctx.fillStyle = "#FFF4A3";
    ctx.fillRect(4, 4, 6, 6);
  });
}

export function sneakerTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#2F6F62";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E8D8B0";
    ctx.fillRect(0, 0, size, 8);
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 24, size, 8);
    ctx.fillStyle = "#B6E04A";
    ctx.fillRect(20, 10, 4, 8);
  });
}
