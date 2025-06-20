import fs from 'fs';
import path from 'path';

// クリティカルCSSを読み込む関数
export function getCriticalCss(): string {
  try {
    // Cloudflare環境ではファイルシステムにアクセスできないため、
    // ビルド時に埋め込む必要があります
    return `/* インライン化されたクリティカルCSS */
:root {
  --background-color: #03031B;
  --text-color: #DEDBFF;
  --border-color: #2C2E47;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'DotGothic16', sans-serif;
  -webkit-text-size-adjust: 100%;
}

/* ヘッダーのモバイルスタイル */
.header-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  background: var(--background-color);
  box-sizing: content-box;
  position: fixed;
}

.home-icon {
  display: flex;
  padding: 10px 0px 10px 30px;
}

/* デスクトップメニューはモバイルでは非表示 */
.desktop-menu {
  display: none;
}

/* ハンバーガーメニューはモバイルでは表示 */
.hamburger-icon {
  display: flex;
  padding: 10px 30px;
  cursor: pointer;
  color: var(--text-color);
  align-items: center;
  justify-content: center;
}

/* モバイルメニュー */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: var(--background-color);
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.mobile-menu.open {
  transform: translateX(0);
}

/* メディアクエリ - デスクトップ */
@media screen and (min-width: 769px) {
  .desktop-menu {
    display: flex;
    padding: 10px 50px;
    align-items: flex-start;
    gap: 30px;
  }
  
  .hamburger-icon {
    display: none;
  }
}`;
  } catch (error) {
    console.error('Critical CSS could not be loaded:', error);
    return '';
  }
}