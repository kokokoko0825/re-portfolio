import { ReactNode, useEffect, useState } from "react";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ArticleList, ArticleData } from "../../../../component/Article/ArticleList";
import * as styles from "./styles.css";

export const Blog = (): ReactNode => {
    const [articles, setArticles] = useState<ArticleData[]>([]);

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
            setArticles(postsData);
        };

        fetchPosts();
    }, []);

    return (
        <div id="blog" className={styles.blog}>
            <div className={styles.subtitleFrame}>
                <div className={styles.subTitle}>Blog</div>
            </div>
            <div className={styles.blogList}>
                <ArticleList articles={articles} />
            </div>
        </div>
    );
}