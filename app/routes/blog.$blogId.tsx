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

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Koshi Tanakaのブログ記事" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

interface BlogData {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export default function BlogId() {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState<BlogData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!blogId) {
                setError("ブログIDが指定されていません");
                setIsLoading(false);
                return;
            }

            try {
                const blogDoc = doc(db, "blogs", blogId);
                const blogSnapshot = await getDoc(blogDoc);

                if (blogSnapshot.exists()) {
                    const data = blogSnapshot.data();
                    setBlogData({
                        id: blogSnapshot.id,
                        title: data.title || "",
                        content: data.content || "",
                        thumbnail: data.thumbnail || "",
                        createdAt: data.createdAt || null,
                        updatedAt: data.updatedAt || null
                    });
                } else {
                    setError("ブログ記事が見つかりません");
                }
            } catch (error) {
                console.error("ブログ記事の取得に失敗しました:", error);
                setError("ブログ記事の取得に失敗しました");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogData();
    }, [blogId]);

    // コンテンツが更新された後に埋め込みを初期化
    useEffect(() => {
        if (blogData && contentRef.current) {
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
    }, [blogData]);

    // テーマが変更されたときにTwitter埋め込みを再初期化（テーマ変更時のみ）
    useEffect(() => {
        if (blogData && contentRef.current) {
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
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !blogData) {
        return (
            <div className={styles.frame}>
                <Header />
                <div className={styles.blogId}>
                    <div style={{color: "#ff6b6b", textAlign: "center", padding: "20px"}}>
                        {error || "エラーが発生しました"}
                    </div>
                    <div className={styles.backFrame}>
                        <Link to="/blog">
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
                <small>投稿日: {formatDate(blogData.createdAt)},  編集日: {formatDate(blogData.updatedAt)}</small>
                <div className={styles.thumbnail}>
                    <span>{blogData.thumbnail}</span>
                    <h1>{blogData.title}</h1>
                </div>
                <div className={styles.textFrame}>
                    <div 
                        ref={contentRef}
                        className="znc" 
                        dangerouslySetInnerHTML={renderMarkdownWithEmbeds(blogData.content)} 
                    />
                </div>
                <div className={styles.backFrame}>
                    <Link to="/blog">
                        <small>Back</small>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}