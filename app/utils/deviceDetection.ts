/**
 * サーバーサイドでのデバイス検出ユーティリティ
 */

/**
 * User-Agentからモバイルデバイスを検出
 */
export function isMobileUserAgent(userAgent: string): boolean {
    if (!userAgent) return false;
    
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
}

/**
 * より詳細なデバイスタイプ検出
 */
export interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    os?: 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown';
}

export function detectDevice(userAgent: string): DeviceInfo {
    if (!userAgent) {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            deviceType: 'desktop',
            os: 'unknown'
        };
    }

    const ua = userAgent.toLowerCase();
    
    // モバイル検出
    const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
    
    // タブレット検出
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(ua);
    
    // OS検出
    let os: DeviceInfo['os'] = 'unknown';
    if (/iphone|ipad|ipod/.test(ua)) os = 'ios';
    else if (/android/.test(ua)) os = 'android';
    else if (/windows/.test(ua)) os = 'windows';
    else if (/mac/.test(ua)) os = 'mac';
    else if (/linux/.test(ua)) os = 'linux';

    const isDesktop = !isMobile && !isTablet;
    
    let deviceType: DeviceInfo['deviceType'] = 'desktop';
    if (isMobile) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';

    return {
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        os
    };
}

/**
 * Remixのrequestからデバイス情報を取得
 */
export function getDeviceInfoFromRequest(request: Request): DeviceInfo {
    const userAgent = request.headers.get('User-Agent') || '';
    return detectDevice(userAgent);
} 