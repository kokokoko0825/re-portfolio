import { createContext, useContext, ReactNode } from "react";
import { DeviceInfo } from "../utils/deviceDetection";

interface DeviceContextType extends DeviceInfo {
    // 追加のクライアントサイド情報
    screenWidth?: number;
    screenHeight?: number;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
    children: ReactNode;
    serverDeviceInfo: DeviceInfo;
}

export function DeviceProvider({ children, serverDeviceInfo }: DeviceProviderProps) {
    return (
        <DeviceContext.Provider value={serverDeviceInfo}>
            {children}
        </DeviceContext.Provider>
    );
}

export function useDevice(): DeviceContextType {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error("useDevice must be used within a DeviceProvider");
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
        os: 'unknown'
    };
    
    return context || fallback;
} 