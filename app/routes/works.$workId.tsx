import { PhraseText } from "~/component/PhraseText";
import { DateText } from "../component/DateText";
import { thumbnail as workThumbnail } from "../component/worksItem/styles.css";
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
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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

    // DOM更新後に埋め込みとコード表示を初期化する。
    useEffect(() => {
        if (!workData || !contentRef.current) return;
        initializeAllEmbeds();
        let cancelled = false;
        void (async () => {
            try {
                const { loadPrism } = await import("../utils/prism.client");
                const Prism = await loadPrism();
                if (!cancelled && contentRef.current) {
                    Prism.highlightAllUnder(contentRef.current);
                }
            } catch (error) {
                console.error("Prism initialization failed:", error);
            }
        })();
        return () => { cancelled = true; };
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


    if (isLoading) {
        return (
            <div className={styles.frame}>
                <Header />
                <main className={styles.blogId}>
                    <h1>Works</h1>
                    <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !workData) {
        return (
            <div className={styles.frame}>
                <Header />
                <main className={styles.blogId}>
                    <h1>Works</h1>
                    <div style={{color: "#ff6b6b", textAlign: "center", padding: "20px"}}>
                        {error || "エラーが発生しました"}
                    </div>
                    <div className={styles.backFrame}>
                        <Link to="/works" className={styles.backLink}>Back</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.frame}>
            <Header />
            <main className={styles.blogId}>
                <small>投稿日: <DateText value={workData.createdAt} />,  編集日: <DateText value={workData.updatedAt} /></small>
                <div className={styles.thumbnail}>
                    <img src={workData.thumbnail || "/images/icon.jpg"} alt="" className={workThumbnail} />
                    <h1 className={styles.articleTitle}><PhraseText>{workData.title}</PhraseText></h1>
                </div>
                <div className={styles.textFrame}>
                    <div 
                        ref={contentRef}
                        className="znc" 
                        dangerouslySetInnerHTML={renderMarkdownWithEmbeds(workData.content)} 
                    />
                </div>
                <div className={styles.backFrame}>
                    <Link to="/works" className={styles.backLink}>Back</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
