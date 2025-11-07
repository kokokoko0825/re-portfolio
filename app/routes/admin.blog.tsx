import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { AdminBlogItem } from "../component/adminBlogItem/adminBlogItem";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";
import { vars } from "../styles/theme.css";

interface BlogData {
    id: string;
    number: number;
    title: string;
    createdAt: Timestamp;
}

export default function AdminBlog() {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = (deletedId: string) => {
        setBlogs(prev => prev.filter(blog => blog.id !== deletedId));
    };

    return (
        <ProtectedRoute>
            <div className={styles.frame}>
                <AdminHeader />
                <div className={styles.adminManagement}>
                    <h1>Blogの管理</h1>
                    <div className={styles.newCreate}>
                        <Link to="/blog/new">
                            <button style={{color: "#03031B", background: "#F2F1FF", border: "2px solid #9496AD"}}>New Create</button>
                        </Link>
                    </div>
                    {isLoading ? (
                        <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                            読み込み中...
                        </div>
                    ) : blogs.length === 0 ? (
                        <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                            ブログ記事がありません
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <AdminBlogItem 
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                createdAt={blog.createdAt}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}