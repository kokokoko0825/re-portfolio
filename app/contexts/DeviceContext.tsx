import { createContext, useContext, ReactNode, useEffect } from "react";
import { DeviceInfo } from "../utils/deviceDetection";

interface DeviceContextType extends DeviceInfo {
    // 追加のクライアントサイド情報
    screenWidth?: number;
    screenHeight?: number;
    // デバッグ情報
    contextInitialized?: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
    children: ReactNode;
    serverDeviceInfo: DeviceInfo;
}

export function DeviceProvider({ children, serverDeviceInfo }: DeviceProviderProps) {
    const contextValue: DeviceContextType = {
        ...serverDeviceInfo,
        contextInitialized: true
    };

    // デバッグ情報をログ出力
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('🔧 DeviceProvider initialized:', {
                serverDeviceInfo,
                contextValue
            });
        }
    }, [serverDeviceInfo, contextValue]);

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
}

export function useDevice(): DeviceContextType {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        const error = new Error("useDevice must be used within a DeviceProvider");
        console.error('❌ DeviceContext Error:', error.message);
        throw error;
    }
    return context;
}

/**
 * サーバーサイドで安全にデバイス情報を取得するフック
 */
export function useServerSafeDevice(): DeviceContextType {
    const context = useContext(DeviceContext);
    
    // フォールバック値（SSR時やコンテキストが無い場合）
    const fallback: DeviceContextType = {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        deviceType: 'desktop',
        os: 'unknown',
        contextInitialized: false,
        detectionReason: 'Fallback - DeviceContext not available'
    };
    
    // デバッグ情報
    if (process.env.NODE_ENV === 'development') {
        console.log('🔍 useServerSafeDevice called:', {
            hasContext: !!context,
            contextValue: context,
            willUseFallback: !context
        });
    }
    
    return context || fallback;
} 