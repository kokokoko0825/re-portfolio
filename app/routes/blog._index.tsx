import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { BlogItem } from "../component/blogItem";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface BlogData {
    id: string;
    number: number;
    title: string;
    thumbnail: string;
    createdAt: Timestamp;
}

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsQuery = query(
                    collection(db, "blogs"),
                    orderBy("number", "desc")
                );
                const querySnapshot = await getDocs(blogsQuery);
                
                const blogsData: BlogData[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    blogsData.push({
                        id: doc.id,
                        number: data.number || 0,
                        title: data.title || "",
                        thumbnail: data.thumbnail || "",
                        createdAt: data.createdAt || null
                    });
                });
                
                setBlogs(blogsData);
            } catch (error) {
                console.error("ブログ記事の取得に失敗しました:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.blog}>
                <h1>Blog</h1>
                {isLoading ? (
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                ) : blogs.length === 0 ? (
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        ブログ記事がありません
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <BlogItem 
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            createdAt={blog.createdAt}
                        />
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}