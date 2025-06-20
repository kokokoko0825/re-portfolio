// デバイス検出と即時スタイル適用のためのスクリプト
(function() {
  // モバイルデバイスかどうかを判定
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  }

  // HTMLにクラスを追加
  function applyDeviceClass() {
    if (isMobileDevice()) {
      document.documentElement.classList.add('mobile-device');
      document.documentElement.classList.add('mobile-view');
      // モバイル用のメタビューポートを確実に設定
      ensureViewportMeta();
      
      // DeviceContextと同期するためのカスタムイベントを発行
      if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('deviceDetection', { 
          detail: { isMobile: true, deviceType: 'mobile' } 
        });
        window.dispatchEvent(event);
      }
    } else {
      document.documentElement.classList.add('desktop-device');
      
      // DeviceContextと同期するためのカスタムイベントを発行
      if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('deviceDetection', { 
          detail: { isMobile: false, deviceType: 'desktop' } 
        });
        window.dispatchEvent(event);
      }
    }
  }

  // ビューポートメタタグを確実に設定
  function ensureViewportMeta() {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  }

  // 即時実行
  applyDeviceClass();
  
  // リサイズイベントでも再適用
  window.addEventListener('resize', function() {
    // モバイル/デスクトップの切り替わり時にクラスを更新
    const wasMobile = document.documentElement.classList.contains('mobile-device');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && !wasMobile) {
      document.documentElement.classList.add('mobile-device');
      document.documentElement.classList.add('mobile-view');
      document.documentElement.classList.remove('desktop-device');
      
      // DeviceContextと同期するためのカスタムイベントを発行
      if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('deviceDetection', { 
          detail: { isMobile: true, deviceType: 'mobile' } 
        });
        window.dispatchEvent(event);
      }
    } else if (!isMobile && wasMobile) {
      document.documentElement.classList.remove('mobile-device');
      document.documentElement.classList.remove('mobile-view');
      document.documentElement.classList.add('desktop-device');
      
      // DeviceContextと同期するためのカスタムイベントを発行
      if (typeof window.CustomEvent === 'function') {
        const event = new CustomEvent('deviceDetection', { 
          detail: { isMobile: false, deviceType: 'desktop' } 
        });
        window.dispatchEvent(event);
      }
    }
  });
})();