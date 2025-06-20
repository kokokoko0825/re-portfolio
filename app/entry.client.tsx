/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// シンプルなスタイル適用
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('styles-loaded');
  
  // モバイル検出の強化
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
  if (isMobile) {
    document.documentElement.classList.add('mobile-view');
    document.documentElement.classList.add('mobile-device');
  } else {
    // モバイルクラスが誤って適用されている場合に削除
    document.documentElement.classList.remove('mobile-view');
    document.documentElement.classList.remove('mobile-device');
    document.documentElement.classList.add('desktop-device');
  }
  
  // リサイズ検出の追加
  window.addEventListener('resize', () => {
    const currentIsMobile = window.innerWidth <= 768;
    const hasMobileClass = document.documentElement.classList.contains('mobile-view');
    
    if (currentIsMobile && !hasMobileClass) {
      document.documentElement.classList.add('mobile-view');
      document.documentElement.classList.add('mobile-device');
      document.documentElement.classList.remove('desktop-device');
    } else if (!currentIsMobile && hasMobileClass) {
      document.documentElement.classList.remove('mobile-view');
      document.documentElement.classList.remove('mobile-device');
      document.documentElement.classList.add('desktop-device');
    }
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
