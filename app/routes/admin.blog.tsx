import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { AdminBlogItem } from "../component/adminBlogItem/adminBlogItem";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface BlogData {
    id: string;
    title: string;
    updatedAt: Timestamp;
}

export default function AdminBlog() {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsQuery = query(
                    collection(db, "blogs"),
                    orderBy("updatedAt", "desc")
                );
                const querySnapshot = await getDocs(blogsQuery);
                
                const blogsData: BlogData[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    blogsData.push({
                        id: doc.id,
                        title: data.title || "",
                        updatedAt: data.updatedAt || null
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
            <AdminHeader />
            <div className={styles.adminManagement}>
                <h1>Blogの管理</h1>
                <div className={styles.newCreate}>
                    <Link to="/blog/new">
                        <button>New Create</button>
                    </Link>
                </div>
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
                        <AdminBlogItem 
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            updatedAt={blog.updatedAt}
                        />
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}