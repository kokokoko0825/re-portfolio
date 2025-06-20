/**
 * スタイル適用のためのユーティリティ関数
 */

/**
 * モバイルビューかどうかを判定する関数
 * @returns boolean
 */
export function isMobileView(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

/**
 * スタイルの適用状態を設定する関数
 */
export function applyStylesState(): void {
  if (typeof document === 'undefined') return;
  
  // スタイル読み込み完了のマーカーを設定
  document.documentElement.classList.add('styles-loaded');
  
  // モバイルビューの場合はクラスを追加
  if (isMobileView()) {
    document.documentElement.classList.add('mobile-view');
  } else {
    document.documentElement.classList.remove('mobile-view');
  }
}

/**
 * ウィンドウサイズ変更時のハンドラを設定する関数
 */
export function setupResizeHandler(): void {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('resize', () => {
    if (isMobileView()) {
      document.documentElement.classList.add('mobile-view');
    } else {
      document.documentElement.classList.remove('mobile-view');
    }
  });
}