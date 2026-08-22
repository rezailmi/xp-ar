import * as THREE from "three";

function canvasTexture(width, paint, height = width) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  paint(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function noiseFill(ctx, width, height, colors, step = 1) {
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const n = (x * 17 + y * 31 + (x ^ y) * 7) % colors.length;
      ctx.fillStyle = colors[n];
      ctx.fillRect(x, y, step, step);
    }
  }
}

export function plasterTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#2B2B5D";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const n = (x * 13 + y * 29 + (x ^ y)) % 11;
        if (n === 0) {
          ctx.fillStyle = "#24244A";
          ctx.fillRect(x, y, 1, 1);
        } else if (n === 1) {
          ctx.fillStyle = "#5350A2";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

export function floorTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#C4A45A";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#A88840";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#8A6A30";
    ctx.fillRect(0, 0, 2, size);
    ctx.fillRect(size - 2, 0, 2, size);
    ctx.fillRect(0, 0, size, 2);
    ctx.fillRect(0, size - 2, size, 2);
    ctx.fillStyle = "#D8BC72";
    for (let x = 6; x < size; x += 8) {
      ctx.fillRect(x, 3, 1, size - 6);
    }
  });
}

export function rugTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#7A4030";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#8C4A36";
    for (let y = 6; y < size - 6; y += 4) {
      ctx.fillRect(6, y, size - 12, 2);
    }
    ctx.fillStyle = "#5A2E24";
    ctx.fillRect(0, 0, size, 5);
    ctx.fillRect(0, size - 5, size, 5);
    ctx.fillRect(0, 0, 5, size);
    ctx.fillRect(size - 5, 0, 5, size);
    ctx.fillStyle = "#C4A070";
    ctx.fillRect(4, 4, size - 8, 1);
    ctx.fillRect(4, size - 5, size - 8, 1);
  });
}

export function sofaTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#D8C4A0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C4AE88";
    for (let y = 0; y < size; y += 3) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#E8D8B4";
    ctx.fillRect(8, 10, 6, 4);
    ctx.fillRect(36, 28, 5, 3);
    ctx.fillStyle = "#A89068";
    ctx.fillRect(0, 0, size, 1);
  });
}

export function woodTrimTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#8A5A32";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#A46E3E";
    for (let y = 4; y < size; y += 8) {
      ctx.fillRect(0, y, size, 2);
    }
    ctx.fillStyle = "#6A3E1E";
    ctx.fillRect(0, 0, size, 1);
    ctx.fillStyle = "#C48850";
    ctx.fillRect(12, 20, 8, 1);
  });
}

export function metalTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#C8C4BC";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#A8A49C";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#E0DCD4";
    ctx.fillRect(size - 4, 0, 2, size);
  });
}

export function whitePlasticTexture() {
  return canvasTexture(32, (ctx, size) => {
    noiseFill(ctx, size, size, ["#F4F0E8", "#E8E4DC", "#F8F4EC", "#D8D4CC"], 2);
  });
}

export function cookerPanelTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#2A2A2E";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#4A4A50";
    ctx.fillRect(3, 6, 6, 6);
    ctx.fillRect(13, 6, 6, 6);
    ctx.fillRect(23, 6, 6, 6);
    ctx.fillStyle = "#C44A32";
    ctx.fillRect(5, 20, 4, 4);
    ctx.fillStyle = "#E8E0C8";
    ctx.fillRect(14, 21, 12, 2);
    ctx.fillRect(14, 25, 8, 2);
  });
}

export function shadeTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8D2A0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#D4BA82";
    for (let y = 0; y < size; y += 5) {
      ctx.fillRect(0, y, size, 2);
    }
    ctx.fillStyle = "#F4E6C0";
    ctx.fillRect(0, 2, size, 1);
  });
}

export function curtainTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8D8B8";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#D4C09A";
    for (let x = 0; x < size; x += 5) {
      ctx.fillRect(x, 0, 2, size);
    }
    ctx.fillStyle = "#F2E6CC";
    ctx.fillRect(2, 0, 1, size);
  });
}

export function outsideTexture() {
  return canvasTexture(64, (ctx, size) => {
    for (let y = 0; y < size; y += 1) {
      const t = y / size;
      const r = Math.round(248 - t * 40);
      const g = Math.round(157 - t * 90);
      const b = Math.round(9 + t * 40);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#D36B11";
    ctx.fillRect(8, 10, 18, 4);
    ctx.fillRect(30, 6, 22, 3);
    ctx.fillStyle = "#1A1028";
    for (let i = 0; i < 10; i += 1) {
      const x = i * 6;
      const h = 10 + ((i * 7) % 16);
      ctx.fillRect(x, size - h, 5, h);
    }
    ctx.fillStyle = "#F0D48A";
    for (let y = 40; y < 62; y += 4) {
      for (let x = 1; x < 62; x += 5) {
        if ((x + y) % 7 !== 0) ctx.fillRect(x, y, 1, 1);
      }
    }
  });
}

export function tvGlowTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#0C1030";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 2) {
      ctx.fillStyle = y % 4 === 0 ? "#2B2B5D" : "#16183A";
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#6A88FF";
    ctx.fillRect(10, 12, 44, 28);
    ctx.fillStyle = "#C8D8FF";
    ctx.fillRect(18, 18, 28, 14);
    ctx.fillStyle = "#5350A2";
    ctx.fillRect(8, 46, 14, 6);
    ctx.fillStyle = "#3A4A88";
    ctx.fillRect(26, 46, 14, 6);
    ctx.fillStyle = "#8898C8";
    ctx.fillRect(44, 48, 12, 4);
  });
}

export function notePosterTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#F2E6C4";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C4B48A";
    ctx.fillRect(0, 0, size, 2);
    ctx.fillRect(0, size - 2, size, 2);
    ctx.fillStyle = "#E8C84A";
    ctx.fillRect(38, 10, 16, 16);
    ctx.fillStyle = "#D4A020";
    ctx.fillRect(42, 6, 8, 8);
    ctx.fillRect(34, 14, 8, 8);
    ctx.fillRect(50, 14, 8, 8);
    ctx.fillStyle = "#6A4A28";
    ctx.fillRect(8, 12, 22, 2);
    ctx.fillRect(8, 20, 18, 2);
    ctx.fillRect(8, 28, 24, 2);
    ctx.fillRect(8, 36, 14, 2);
    ctx.fillRect(8, 46, 20, 2);
    ctx.fillStyle = "#C8A878";
    ctx.fillRect(2, 2, 6, 6);
    ctx.fillRect(56, 2, 6, 6);
  });
}

export function nightPosterTexture() {
  return canvasTexture(64, (ctx, size) => {
    ctx.fillStyle = "#1A2040";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#12182E";
    ctx.fillRect(0, 40, size, 24);
    const windows = ["#F2D48A", "#E8A868", "#8AB0D8", "#F2D48A", "#C89050"];
    for (let y = 6; y < 38; y += 8) {
      for (let x = 6; x < 58; x += 8) {
        if ((x + y) % 16 !== 0) {
          ctx.fillStyle = windows[(x + y) % windows.length];
          ctx.fillRect(x, y, 3, 4);
        }
      }
    }
    ctx.fillStyle = "#2A3858";
    ctx.fillRect(18, 28, 12, 20);
    ctx.fillRect(40, 22, 10, 26);
  });
}

export function mountainPosterTexture() {
  return canvasTexture(32, (ctx, w, h) => {
    ctx.fillStyle = "#1A1840";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#5350A2";
    ctx.fillRect(0, 10, w, 8);
    ctx.fillStyle = "#2B2B5D";
    ctx.fillRect(4, 6, 8, 14);
    ctx.fillRect(16, 4, 10, 16);
    ctx.fillStyle = "#F89D09";
    ctx.fillRect(6, 12, 2, 2);
    ctx.fillRect(20, 10, 2, 2);
    ctx.fillStyle = "#130E1F";
    ctx.fillRect(0, 22, w, 10);
  });
}

export function vinylBusTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E0B040";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#2A3A58";
    ctx.fillRect(4, 12, 24, 10);
    ctx.fillStyle = "#F4F0E0";
    ctx.fillRect(6, 14, 5, 4);
    ctx.fillRect(13, 14, 5, 4);
    ctx.fillRect(20, 14, 5, 4);
    ctx.fillStyle = "#1A1A1A";
    ctx.fillRect(7, 20, 4, 4);
    ctx.fillRect(20, 20, 4, 4);
    ctx.fillStyle = "#6A4A20";
    ctx.fillRect(8, 4, 16, 3);
    ctx.fillRect(10, 26, 12, 2);
  });
}

export function vinylWaveTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#2A1840";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C85A88";
    for (let x = 0; x < size; x += 1) {
      const y = 12 + Math.round(Math.sin(x * 0.45) * 5);
      ctx.fillRect(x, y, 1, 4);
    }
    ctx.fillStyle = "#78C4C0";
    for (let x = 0; x < size; x += 1) {
      const y = 20 + Math.round(Math.sin(x * 0.35 + 1) * 4);
      ctx.fillRect(x, y, 1, 3);
    }
    ctx.fillStyle = "#F2E0A8";
    ctx.fillRect(10, 4, 12, 2);
  });
}

export function vinylDotTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#3A2A28";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#D8A878";
    ctx.fillRect(10, 8, 12, 12);
    ctx.fillStyle = "#8A4030";
    ctx.fillRect(13, 11, 6, 6);
    ctx.fillStyle = "#E8D0A0";
    ctx.fillRect(6, 24, 20, 3);
  });
}

export function recordLabelTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C4A060";
    ctx.fillRect(5, 5, 6, 6);
    ctx.fillStyle = "#111111";
    ctx.fillRect(7, 7, 2, 2);
  });
}

export function bagTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#C4A878";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#A88858";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#8A6840";
    ctx.fillRect(10, 8, 12, 16);
    ctx.fillStyle = "#D8C090";
    ctx.fillRect(12, 12, 8, 2);
  });
}

export function bottleGreenTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#2A5A38";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E8D8B0";
    ctx.fillRect(2, 4, 12, 8);
    ctx.fillStyle = "#3A7A48";
    ctx.fillRect(3, 6, 10, 2);
    ctx.fillStyle = "#1A3A24";
    ctx.fillRect(0, 0, size, 2);
  });
}

export function bottleAmberTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#C48828";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#F2E0A8";
    ctx.fillRect(2, 5, 12, 6);
    ctx.fillStyle = "#8A5A18";
    ctx.fillRect(4, 7, 8, 2);
  });
}

export function canTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#C42828";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#F4F0E8";
    ctx.fillRect(0, 6, size, 4);
    ctx.fillStyle = "#8A1818";
    ctx.fillRect(5, 7, 6, 2);
    ctx.fillStyle = "#E8E0D0";
    ctx.fillRect(0, 0, size, 2);
  });
}

export function noodleTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#D4A04A";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#E8C46A";
    ctx.fillRect(1, 3, 14, 2);
    ctx.fillRect(2, 8, 12, 2);
    ctx.fillRect(1, 12, 13, 2);
    ctx.fillStyle = "#8A3A28";
    ctx.fillRect(4, 5, 3, 3);
    ctx.fillRect(10, 9, 3, 3);
  });
}

export function glowTexture() {
  return canvasTexture(32, (ctx, size) => {
    const mid = size / 2;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const dx = (x + 0.5 - mid) / mid;
        const dy = (y + 0.5 - mid) / mid;
        const t = Math.min(1, Math.sqrt(dx * dx + dy * dy));
        const a = Math.round((1 - t) * (1 - t) * 255);
        ctx.fillStyle = `rgba(255,255,255,${a / 255})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  });
}

export function steamTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(240,236,228,0.7)";
    ctx.fillRect(5, 2, 4, 8);
    ctx.fillRect(3, 6, 3, 6);
    ctx.fillRect(9, 4, 3, 7);
  });
}

export function catBlackTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#1A1A1C";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const n = (x * 7 + y * 11 + (x ^ y)) % 9;
        if (n === 0) {
          ctx.fillStyle = "#0C0C10";
          ctx.fillRect(x, y, 1, 1);
        } else if (n === 1) {
          ctx.fillStyle = "#2A2A30";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

export function catWhiteTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8E4DC";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const n = (x * 5 + y * 13) % 8;
        if (n === 0) {
          ctx.fillStyle = "#C8C4BC";
          ctx.fillRect(x, y, 1, 1);
        } else if (n === 1) {
          ctx.fillStyle = "#F4F0E8";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

export function pipsVestTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#5A6840";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#4A5834";
    for (let y = 0; y < size; y += 3) {
      ctx.fillRect(0, y, size, 1);
    }
    ctx.fillStyle = "#6A784C";
    for (let x = 2; x < size; x += 4) {
      ctx.fillRect(x, 0, 1, size);
    }
    ctx.fillStyle = "#3A4428";
    ctx.fillRect(20, 10, 8, 10);
  });
}

export function pipsTuftTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#A84A28";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#8A381C";
    ctx.fillRect(0, 0, size, 3);
    ctx.fillStyle = "#C86238";
    ctx.fillRect(4, 6, 6, 4);
  });
}

export function pipsSlipperTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#8A5A38";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#5A3A24";
    ctx.fillRect(0, 11, size, 5);
    ctx.fillStyle = "#E0C090";
    ctx.fillRect(2, 3, 12, 4);
    ctx.fillStyle = "#C47848";
    ctx.fillRect(6, 4, 4, 2);
  });
}

export function shojiTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8D2A0";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#C4A878";
    for (let i = 0; i <= size; i += 8) {
      ctx.fillRect(i, 0, 1, size);
      ctx.fillRect(0, i, size, 1);
    }
    ctx.fillStyle = "#8A6A40";
    ctx.fillRect(0, 0, size, 2);
    ctx.fillRect(0, size - 2, size, 2);
  });
}

export function futonTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#E8E0D4";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#D0C8BC";
    for (let y = 0; y < size; y += 4) {
      ctx.fillRect(0, y, size, 1);
    }
  });
}

export function blanketTexture() {
  return canvasTexture(32, (ctx, size) => {
    ctx.fillStyle = "#2B2B5D";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#5350A2";
    for (let y = 0; y < size; y += 6) {
      ctx.fillRect(0, y, size, 3);
    }
    ctx.fillStyle = "#D36B11";
    ctx.fillRect(0, 14, size, 2);
    ctx.fillRect(0, 28, size, 2);
  });
}

export function bookCoverTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#3A2848";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#F89D09";
    ctx.fillRect(2, 3, 12, 3);
    ctx.fillStyle = "#E8D8B0";
    ctx.fillRect(3, 8, 10, 2);
    ctx.fillRect(4, 11, 8, 2);
  });
}

export function lavaTexture() {
  return canvasTexture(16, (ctx, size) => {
    ctx.fillStyle = "#520C20";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#F0A24A";
    ctx.fillRect(4, 3, 8, 8);
    ctx.fillStyle = "#D36B11";
    ctx.fillRect(6, 5, 4, 4);
  });
}
