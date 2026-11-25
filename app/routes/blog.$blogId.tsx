import { PhraseText } from "~/component/PhraseText";
import { DateText } from "../component/DateText";
import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import { TableOfContents } from "../component/TableOfContents";
import * as styles from "./styles.css";
import { Link, useParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { renderMarkdownWithEmbeds, initializeAllEmbeds, initializeTwitterEmbeds } from "../utils/markdownRenderer";
import { useTheme } from "../contexts/ThemeContext";
import { normalizeBlogTags } from "../utils/blogTags";
// Prism はクライアント側でのみ動的に読み込む
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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
    tags: string[];
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
                        updatedAt: data.updatedAt || null,
                        tags: normalizeBlogTags(data),
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


    if (isLoading) {
        return (
            <div className={styles.frame}>
                <Header />
                <main className={styles.blogId}>
                    <h1>Blog</h1>
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !blogData) {
        return (
            <div className={styles.frame}>
                <Header />
                <main className={styles.blogId}>
                    <h1>Blog</h1>
                    <div style={{color: "#ff6b6b", textAlign: "center", padding: "20px"}}>
                        {error || "エラーが発生しました"}
                    </div>
                    <div className={styles.backFrame}>
                        <Link to="/blog" className={styles.backLink}>Back</Link>
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
                <small>投稿日: <DateText value={blogData.createdAt} />,  編集日: <DateText value={blogData.updatedAt} /></small>
                <div className={styles.thumbnail}>
                    <span>{blogData.thumbnail}</span>
                    <h1><PhraseText>{blogData.title}</PhraseText></h1>
                    {blogData.tags.length > 0 && (
                        <div className={styles.tagList}>
                            {blogData.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className={styles.tagChip}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.blogDetailWrapper}>
                    <article className={styles.blogArticle}>
                        <div className={styles.textFrame}>
                            <div
                                ref={contentRef}
                                className="znc"
                                dangerouslySetInnerHTML={renderMarkdownWithEmbeds(blogData.content)}
                            />
                        </div>
                        <div className={styles.backFrame}>
                            <Link to="/blog" className={styles.backLink}>Back</Link>
                        </div>
                    </article>
                    <aside className={styles.tocAside}>
                        <details className={styles.tocAccordion} open>
                            <summary className={styles.tocSummary}>目次</summary>
                            <div className={styles.tocTitle}>目次</div>
                            <TableOfContents contentRef={contentRef} contentKey={blogId} />
                        </details>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}
