import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link, useParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { renderMarkdownWithEmbeds, initializeAllEmbeds, initializeTwitterEmbeds } from "../utils/markdownRenderer";
import { useTheme } from "../contexts/ThemeContext";
// Prism はクライアント側でのみ動的に読み込む
import { MetaFunction } from "@remix-run/cloudflare";
import { vars } from "../styles/theme.css";

export const meta: MetaFunction = () => {
  return [
    { title: "作品詳細 | kokokoko0825" },
    { name: "description", content: "Koshi Tanakaの作品詳細" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

interface WorkData {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export default function BlogId() {
    const { workId } = useParams();
    const [workData, setWorkData] = useState<WorkData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchWorkData = async () => {
            if (!workId) {
                setError("作品IDが指定されていません");
                setIsLoading(false);
                return;
            }

            try {
                const workDoc = doc(db, "works", workId);
                const workSnapshot = await getDoc(workDoc);

                if (workSnapshot.exists()) {
                    const data = workSnapshot.data();
                    setWorkData({
                        id: workSnapshot.id,
                        title: data.title || "",
                        content: data.content || "",
                        thumbnail: data.thumbnail || "",
                        createdAt: data.createdAt || null,
                        updatedAt: data.updatedAt || null
                    });
                } else {
                    setError("作品が見つかりません");
                }
            } catch (error) {
                console.error("作品の取得に失敗しました:", error);
                setError("作品の取得に失敗しました");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkData();
    }, [workId]);

    // コンテンツが更新された後に埋め込みを初期化
    useEffect(() => {
        if (workData && contentRef.current) {
            // 少し遅延を入れてDOMが更新されるのを待つ
            setTimeout(async () => {
                // コンテンツが変更された場合は強制再初期化
                initializeAllEmbeds();
                if (contentRef.current) {
                    const Prism = (await import("prismjs")).default;
                    await Promise.all([
                        import("prismjs/plugins/line-numbers/prism-line-numbers"),
                        import("prismjs/components/prism-markup"),
                        import("prismjs/components/prism-css"),
                        import("prismjs/components/prism-javascript"),
                        import("prismjs/components/prism-jsx"),
                        import("prismjs/components/prism-typescript"),
                        import("prismjs/components/prism-tsx"),
                        import("prismjs/components/prism-json"),
                        import("prismjs/components/prism-bash"),
                        import("prismjs/components/prism-python"),
                        import("prismjs/components/prism-clike"),
                        import("prismjs/components/prism-c"),
                        import("prismjs/components/prism-cpp"),
                        import("prismjs/components/prism-yaml"),
                    ]);
                    Prism.highlightAllUnder(contentRef.current as unknown as ParentNode);
                }
            }, 100);
        }
    }, [workData]);

    // テーマが変更されたときにTwitter埋め込みを再初期化（テーマ変更時のみ）
    useEffect(() => {
        if (workData && contentRef.current) {
            const tweetContainers = contentRef.current.querySelectorAll('[id^="tweet-"]');
            if (tweetContainers.length > 0) {
                // テーマ変更時は強制再初期化
                setTimeout(() => {
                    initializeTwitterEmbeds(true);
                }, 100);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    // FirestoreのTimestampを日付文字列に変換
    const formatDate = (timestamp: Timestamp | null) => {
        if (!timestamp) return "";
        
        const date = timestamp.toDate();
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className={styles.frame}>
                <Header />
                <div className={styles.blogId}>
                    <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !workData) {
        return (
            <div className={styles.frame}>
                <Header />
                <div className={styles.blogId}>
                    <div style={{color: "#ff6b6b", textAlign: "center", padding: "20px"}}>
                        {error || "エラーが発生しました"}
                    </div>
                    <div className={styles.backFrame}>
                        <Link to="/works">
                            <small>Back</small>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.blogId}>
                <small>投稿日: {formatDate(workData.createdAt)},  編集日: {formatDate(workData.updatedAt)}</small>
                <div className={styles.thumbnail}>
                    <img src={workData.thumbnail || "/public/images/icon.jpg"} alt="thumbnail" />
                    <h1>{workData.title}</h1>
                </div>
                <div className={styles.textFrame}>
                    <div 
                        ref={contentRef}
                        className="znc" 
                        dangerouslySetInnerHTML={renderMarkdownWithEmbeds(workData.content)} 
                    />
                </div>
                <div className={styles.backFrame}>
                    <Link to="/works">
                        <small>Back</small>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}