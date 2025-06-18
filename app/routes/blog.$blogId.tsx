import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link, useParams } from "@remix-run/react";
import MarkdownIt from "markdown-it";
import { useState, useEffect } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const md = new MarkdownIt();

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

    // 日付フォーマット関数
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
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        {error || "ブログ記事が見つかりません"}
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
                    <div className="znc" dangerouslySetInnerHTML={{ __html: md.render(blogData.content) }} />
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