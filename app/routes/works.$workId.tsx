import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link, useParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { renderMarkdownWithTwitterEmbed, initializeTwitterEmbeds } from "../utils/markdownRenderer";

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

    // コンテンツが更新された後にTwitter埋め込みを初期化
    useEffect(() => {
        if (workData && contentRef.current) {
            // 少し遅延を入れてDOMが更新されるのを待つ
            setTimeout(() => {
                initializeTwitterEmbeds();
            }, 100);
        }
    }, [workData]);

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

    if (error || !workData) {
        return (
            <div className={styles.frame}>
                <Header />
                <div className={styles.blogId}>
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        {error || "作品が見つかりません"}
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
                        dangerouslySetInnerHTML={renderMarkdownWithTwitterEmbed(workData.content)} 
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