import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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
    // サーバーサイドから取得したデバイス情報を初期値として使用
    const [deviceInfo, setDeviceInfo] = useState<DeviceContextType>({
        ...serverDeviceInfo,
        contextInitialized: true
    });

    // クライアントサイドでのデバイス情報を更新
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768 || 
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            setDeviceInfo(prev => ({
                ...prev,
                isMobile,
                deviceType: isMobile ? 'mobile' : 'desktop',
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            }));

            // リサイズイベントのリスナーを追加
            const handleResize = () => {
                const newIsMobile = window.innerWidth <= 768;
                setDeviceInfo(prev => ({
                    ...prev,
                    isMobile: newIsMobile,
                    deviceType: newIsMobile ? 'mobile' : 'desktop',
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight
                }));
            };
            
            // device-detection.jsからのカスタムイベントを受け取る
            const handleDeviceDetection = (event: any) => {
                if (event.detail) {
                    setDeviceInfo(prev => ({
                        ...prev,
                        ...event.detail,
                        screenWidth: window.innerWidth,
                        screenHeight: window.innerHeight
                    }));
                }
            };

            window.addEventListener('resize', handleResize);
            window.addEventListener('deviceDetection', handleDeviceDetection);
            
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('deviceDetection', handleDeviceDetection);
            };
        }
    }, []);

    return (
        <DeviceContext.Provider value={deviceInfo}>
            {children}
        </DeviceContext.Provider>
    );
}

<<<<<<< HEAD
=======
/**
 * デバイス情報を取得するフック
 */
>>>>>>> dev
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
        deviceType: 'desktop',
        userAgent: null,
        contextInitialized: false
    };
    return context || fallback;
} 