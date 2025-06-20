import fs from 'fs';
import path from 'path';

// クリティカルCSSを読み込む関数
export function getCriticalCss(): string {
  try {
    // Cloudflare環境ではファイルシステムにアクセスできないため、
    // ビルド時に埋め込む必要があります
    return `/* 最小限のクリティカルCSS */
:root {
  --background-color: #03031B;
  --text-color: #DEDBFF;
  --border-color: #2C2E47;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}`;
  } catch (error) {
    console.error('Critical CSS could not be loaded:', error);
    return '';
  }
}