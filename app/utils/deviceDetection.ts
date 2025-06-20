/**
 * デバイス情報の型定義
 */
export interface DeviceInfo {
  isMobile: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userAgent: string | null;
  viewportWidth?: number;
}

/**
 * ユーザーエージェント文字列からモバイルデバイスかどうかを判定する
 * @param userAgent ユーザーエージェント文字列
 * @returns モバイルデバイスの場合はtrue、それ以外はfalse
 */
export function isMobileDevice(userAgent: string | null): boolean {
  if (!userAgent) return false;
  
  // 一般的なモバイルデバイスのパターン
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

/**
 * リクエストからデバイス情報を取得する
 * @param request Remix Request オブジェクト
 * @returns デバイス情報
 */
export function getDeviceInfoFromRequest(request: Request): DeviceInfo {
  const userAgent = request.headers.get('User-Agent');
  const isMobile = isMobileDevice(userAgent);
  
  let deviceType: 'mobile' | 'tablet' | 'desktop';
  
  if (userAgent) {
    if (/iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (isMobile) {
      deviceType = 'mobile';
    } else {
      deviceType = 'desktop';
    }
  } else {
    deviceType = 'desktop';
  }
  
  return {
    isMobile,
    deviceType,
    userAgent
  };
}

/**
 * モバイルデバイス向けのインラインスタイルを生成する
 * @returns インラインスタイルのオブジェクト
 */
export function getMobileStyles() {
  return {
    // ホームページのアイコン
    homeIcon: {
      width: "100px",
      height: "100px",
    },
    // ホームページのアイテム間隔
    homeItem: {
      paddingTop: "120px",
      gap: "70px",
    },
    // アカウントフレームの間隔
    accountFrame: {
      gap: "10px",
    },
    // デスクトップメニューを非表示
    desktopMenu: {
      display: "none",
    },
    // ハンバーガーメニューを表示
    hamburgerIcon: {
      display: "flex",
    }
  };
}

/**
 * デスクトップ向けのインラインスタイルを生成する
 * @returns インラインスタイルのオブジェクト
 */
export function getDesktopStyles() {
  return {
    // ホームページのアイコン
    homeIcon: {
      width: "200px",
      height: "200px",
    },
    // ホームページのアイテム間隔
    homeItem: {
      paddingTop: "124px",
      gap: "50px",
    },
    // アカウントフレームの間隔
    accountFrame: {
      gap: "20px",
    },
    // デスクトップメニューを表示
    desktopMenu: {
      display: "flex",
    },
    // ハンバーガーメニューを非表示
    hamburgerIcon: {
      display: "none",
    }
  };
}