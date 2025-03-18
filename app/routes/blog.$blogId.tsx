import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "@remix-run/react";
import "zenn-content-css";
import * as styles from "./styles.css";
import { renderMarkdown } from "../../utils/markdown";
type BlogPost = {
    title: string;
    content: string;
    createdAt: string;
    thumbnail: string;
};

export default function BlogPost() {
    const { blogId } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (blogId) {
                try {
                    console.log("Fetching blogId:", blogId);

                    const docRef = doc(db, "blogPosts", blogId);
                    const docSnap = await getDoc(docRef);

                    console.log("Doc exists:", docSnap.exists());

                    if (docSnap.exists()) {
                        setPost(docSnap.data() as BlogPost);
                    }
                } catch (error) {
                    console.error("データの取得に失敗しました:", error);
                }
            }
        };

        fetchPost();

        // クライアントサイドでのみ実行
        import("zenn-embed-elements").then((module) => {
            // 必要に応じてモジュールを使用
        });
    }, [blogId]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className={styles.frame}>
            <div className={styles.menu}>
                <Link className={styles.contentsText} to="/"> 戻る</Link>
            </div>
            <div className={styles.titleFrame}>
                <div className={styles.subTitle}>{post.title}</div>
            </div>
            <div className={styles.thumbnail}>
                <img className={styles.img} src={post.thumbnail} alt={post.title} />
            </div>
            <p>{post.createdAt}</p>
            <div className={styles.contentsText} dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        </div>
    );
}