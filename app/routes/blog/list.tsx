import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ArticleList, ArticleData } from "../../component/Article/ArticleList";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
export default function BlogIndex() {
    const [posts, setPosts] = useState<ArticleData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "blogPosts"));
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().content.substring(0, 100), // content の一部を説明として使用
                thumbnailUrl: doc.data().thumbnail,
                date: doc.data().createdAt,
                url: `/blog/${doc.id}`
            })) as ArticleData[];
            setPosts(postsData);
        };

        fetchPosts();
    }, []);

    return (
        <div className={styles.frame}>
            <div className={styles.menu}>
                <Link className={styles.text} to="/"> ホームに戻る</Link>
            </div>
            <div className={styles.titleFrame}>
                <div className={styles.subTitle}>Blog List</div>
            </div>
            <ArticleList articles={posts} />
        </div>
    );
}