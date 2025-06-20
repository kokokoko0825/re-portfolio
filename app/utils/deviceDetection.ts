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
    // デバッグ情報を追加
    userAgent?: string;
    detectionReason?: string;
}

export function detectDevice(userAgent: string): DeviceInfo {
    if (!userAgent) {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            deviceType: 'desktop',
            os: 'unknown',
            userAgent: '',
            detectionReason: 'No User-Agent provided'
        };
    }

    const ua = userAgent.toLowerCase();
    
    // 更に包括的なモバイル検出パターン
    const mobilePatterns = [
        // iOS devices
        /iphone/i,
        /ipod/i,
        
        // Android devices (not tablets)
        /android(?!.*tablet)(?!.*tv)/i,
        
        // Windows Mobile
        /windows phone/i,
        /windows ce/i,
        /iemobile/i,
        
        // BlackBerry
        /blackberry/i,
        /bb10/i,
        
        // Other mobile devices
        /webos/i,
        /opera mini/i,
        /palm/i,
        /symbian/i,
        
        // Generic mobile patterns
        /mobile/i,
        /phone/i,
        
        // Specific mobile browsers
        /crios/i, // Chrome on iOS
        /fxios/i, // Firefox on iOS
        /edgios/i, // Edge on iOS
        
        // Social media app browsers
        /fbav/i, // Facebook app
        /instagram/i, // Instagram app
        /twitter/i, // Twitter app
        /line/i, // LINE app
        
        // Japanese mobile carriers (legacy)
        /docomo/i,
        /kddi/i,
        /softbank/i,
        /willcom/i,
        /emobile/i
    ];
    
    // タブレット検出パターン
    const tabletPatterns = [
        /ipad/i,
        /android.*tablet/i,
        /kindle/i,
        /silk/i,
        /playbook/i,
        /tablet/i,
        /sm-t/i, // Samsung tablets
        /nexus [7-9]/i, // Nexus tablets
        /kftt/i, // Kindle Fire
        /kfot/i, // Kindle Fire
        /xoom/i // Motorola Xoom
    ];
    
    let detectionReason = '';
    let isMobile = false;
    let isTablet = false;
    
    // タブレット検出
    for (const pattern of tabletPatterns) {
        if (pattern.test(ua)) {
            isTablet = true;
            detectionReason = `Tablet detected by pattern: ${pattern.source}`;
            break;
        }
    }
    
    // モバイル検出（タブレットでない場合のみ）
    if (!isTablet) {
        for (const pattern of mobilePatterns) {
            if (pattern.test(ua)) {
                isMobile = true;
                detectionReason = `Mobile detected by pattern: ${pattern.source}`;
                break;
            }
        }
    }
    
    // 特殊ケース: 画面サイズの手がかりがある場合
    if (!isMobile && !isTablet) {
        // 一部のモバイルブラウザは解像度情報を含む
        if (/\b(320|375|414|768)x\d+\b/i.test(ua)) {
            isMobile = true;
            detectionReason = 'Mobile detected by screen resolution in User-Agent';
        }
    }
    
    // OS検出
    let os: DeviceInfo['os'] = 'unknown';
    if (/iphone|ipad|ipod|ios/i.test(ua)) os = 'ios';
    else if (/android/i.test(ua)) os = 'android';
    else if (/windows/i.test(ua)) os = 'windows';
    else if (/mac/i.test(ua)) os = 'mac';
    else if (/linux/i.test(ua)) os = 'linux';

    const isDesktop = !isMobile && !isTablet;
    
    if (isDesktop) {
        detectionReason = 'Desktop detected (no mobile/tablet patterns matched)';
    }
    
    let deviceType: DeviceInfo['deviceType'] = 'desktop';
    if (isMobile) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';

    return {
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        os,
        userAgent,
        detectionReason
    };
}

/**
 * Remixのrequestからデバイス情報を取得
 */
export function getDeviceInfoFromRequest(request: Request): DeviceInfo {
    const userAgent = request.headers.get('User-Agent') || '';
    const deviceInfo = detectDevice(userAgent);
    
    // サーバーサイドでログ出力（開発時のみ）
    if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Device Detection:', {
            url: request.url,
            userAgent: userAgent.substring(0, 100) + (userAgent.length > 100 ? '...' : ''),
            detected: deviceInfo.deviceType,
            reason: deviceInfo.detectionReason,
            isMobile: deviceInfo.isMobile,
            isTablet: deviceInfo.isTablet,
            os: deviceInfo.os
        });
    }
    
    return deviceInfo;
} 