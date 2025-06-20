import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getDeviceInfoFromRequest } from "../../utils/deviceDetection";

export const meta: MetaFunction = () => {
    return [
        { title: "デバイス検出デバッグ - kokokoko0825" },
        { name: "description", content: "デバイス検出のテストページ" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const deviceInfo = getDeviceInfoFromRequest(request);
    const headers = Object.fromEntries(request.headers.entries());
    
    return {
        deviceInfo,
        requestInfo: {
            url: request.url,
            method: request.method,
            headers,
            timestamp: new Date().toISOString()
        }
    };
}

export default function DebugDevice() {
    const { deviceInfo, requestInfo } = useLoaderData<typeof loader>();

    return (
        <div style={{ 
            minHeight: "100vh", 
            padding: "20px",
            fontFamily: "monospace",
            background: "#1a1a1a",
            color: "#fff"
        }}>
            <h1 style={{ color: "#4caf50" }}>🔍 デバイス検出デバッグ</h1>
            
            <div style={{
                background: "#2d2d2d",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#ffeb3b" }}>サーバーサイド検出結果</h2>
                <div style={{ display: "grid", gap: "8px" }}>
                    <div><strong>デバイスタイプ:</strong> {deviceInfo.deviceType}</div>
                    <div><strong>モバイル:</strong> {deviceInfo.isMobile ? '✅' : '❌'}</div>
                    <div><strong>タブレット:</strong> {deviceInfo.isTablet ? '✅' : '❌'}</div>
                    <div><strong>デスクトップ:</strong> {deviceInfo.isDesktop ? '✅' : '❌'}</div>
                    <div><strong>OS:</strong> {deviceInfo.os}</div>
                    <div style={{ color: "#ccc" }}>
                        <strong>検出理由:</strong> {deviceInfo.detectionReason}
                    </div>
                </div>
            </div>

            <div style={{
                background: "#2d2d2d",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#ff9800" }}>User-Agent</h2>
                <div style={{
                    background: "#1a1a1a",
                    padding: "15px",
                    borderRadius: "4px",
                    wordBreak: "break-all",
                    lineHeight: "1.4",
                    fontSize: "14px"
                }}>
                    {deviceInfo.userAgent || 'なし'}
                </div>
            </div>

            <div style={{
                background: "#2d2d2d",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#9c27b0" }}>クライアントサイド情報</h2>
                <div style={{ display: "grid", gap: "8px" }}>
                    <div><strong>画面幅:</strong> <span id="screen-width">計測中...</span>px</div>
                    <div><strong>画面高さ:</strong> <span id="screen-height">計測中...</span>px</div>
                    <div><strong>デバイスPixel比:</strong> <span id="device-pixel-ratio">計測中...</span></div>
                    <div><strong>ユーザーエージェント:</strong> <span id="client-ua">計測中...</span></div>
                    <div><strong>タッチサポート:</strong> <span id="touch-support">計測中...</span></div>
                </div>
            </div>

            <div style={{
                background: "#2d2d2d",
                padding: "20px",
                borderRadius: "8px"
            }}>
                <h2 style={{ color: "#f44336" }}>リクエスト詳細</h2>
                <div style={{ display: "grid", gap: "8px" }}>
                    <div><strong>URL:</strong> {requestInfo.url}</div>
                    <div><strong>Method:</strong> {requestInfo.method}</div>
                    <div><strong>タイムスタンプ:</strong> {requestInfo.timestamp}</div>
                </div>
                
                <h3 style={{ marginTop: "20px" }}>重要なヘッダー</h3>
                <div style={{
                    background: "#1a1a1a",
                    padding: "15px",
                    borderRadius: "4px",
                    fontSize: "12px"
                }}>
                    {['user-agent', 'accept', 'accept-language', 'sec-ch-ua', 'sec-ch-ua-mobile', 'sec-ch-ua-platform'].map(header => (
                        <div key={header} style={{ marginBottom: "5px" }}>
                            <strong>{header}:</strong> {requestInfo.headers[header] || requestInfo.headers[header.toLowerCase()] || 'なし'}
                        </div>
                    ))}
                </div>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                    // クライアントサイド情報を更新
                    document.getElementById('screen-width').textContent = window.screen.width;
                    document.getElementById('screen-height').textContent = window.screen.height;
                    document.getElementById('device-pixel-ratio').textContent = window.devicePixelRatio;
                    document.getElementById('client-ua').textContent = navigator.userAgent.substring(0, 100) + '...';
                    document.getElementById('touch-support').textContent = 'ontouchstart' in window ? '✅ あり' : '❌ なし';
                `
            }} />
        </div>
    );
} 