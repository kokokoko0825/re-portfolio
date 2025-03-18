import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "@remix-run/react";
import "zenn-content-css";
import * as styles from "./styles.css";
import { renderMarkdown } from "../../utils/markdown";
type ProductPost = {
    title: string;
    content: string;
    createdAt: string;
    thumbnail: string;
};

export default function ProductPost() {
    const { productId } = useParams();
    const [post, setPost] = useState<ProductPost | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (productId) {
                const docRef = doc(db, "productPosts", productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost(docSnap.data() as ProductPost);
                }
            }
        };

        fetchPost();

        // クライアントサイドでのみ実行
        import("zenn-embed-elements").then((module) => {
            // 必要に応じてモジュールを使用
        });
    }, [productId]);

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