import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useParams, useNavigate } from "@remix-run/react";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";

export default function AdminBlogEdit() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        thumbnail: "",
        title: "",
        description: "",
        tag: "",
        content: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // 既存のデータを読み込む
    useEffect(() => {
        const fetchBlogData = async () => {
            if (!blogId) {
                alert("ブログIDが指定されていません");
                navigate("/admin");
                return;
            }

            try {
                const blogDoc = doc(db, "blogs", blogId);
                const blogSnapshot = await getDoc(blogDoc);

                if (blogSnapshot.exists()) {
                    const data = blogSnapshot.data();
                    setFormData({
                        thumbnail: data.thumbnail || "",
                        title: data.title || "",
                        description: data.description || "",
                        tag: data.tag || "",
                        content: data.content || ""
                    });
                } else {
                    alert("ブログ記事が見つかりません");
                    navigate("/admin");
                }
            } catch (error) {
                console.error("ブログ記事の取得に失敗しました:", error);
                alert("ブログ記事の取得に失敗しました");
                navigate("/admin");
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchBlogData();
    }, [blogId, navigate]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            alert("タイトルとコンテンツは必須です");
            return;
        }

        setIsLoading(true);
        try {
            const blogData = {
                thumbnail: formData.thumbnail,
                title: formData.title,
                description: formData.description,
                tag: formData.tag,
                content: formData.content,
                updatedAt: serverTimestamp()
                // createdAtは更新しない
            };

            const blogDoc = doc(db, "blogs", blogId!);
            await updateDoc(blogDoc, blogData);
            
            console.log("ブログが正常に更新されました。ID: ", blogId);
            alert("ブログが正常に更新されました！");
            
            // 管理画面に戻る
            navigate("/admin");
        } catch (error) {
            console.error("エラーが発生しました: ", error);
            alert("更新中にエラーが発生しました");
        } finally {
            setIsLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <ProtectedRoute>
                <div className={styles.frame}>
                    <AdminHeader />
                    <div className={styles.adminnewCreate}>
                        <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                            読み込み中...
                        </div>
                    </div>
                    <Footer />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className={styles.frame}>
                <AdminHeader />
                <div className={styles.adminnewCreate}>
                    <input 
                        type="text" 
                        placeholder="thumbnail (絵文字)" 
                        value={formData.thumbnail}
                        onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                        style={{fontSize: "96px", width: "auto", height: "auto", textAlign: "center", border: "none", background: "none", color: "#DEDBFF"}} 
                    />
                    <div className={styles.title}>
                        <input 
                            type="text" 
                            placeholder="title"  
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            style={{fontSize: "36px", width: "100%", height: "auto", background: "none", border: "none", color: "#DEDBFF"}}
                        />
                    </div>
                    <div className={styles.description}>
                        <input 
                            type="text" 
                            placeholder="description" 
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            style={{fontSize: "24px", width: "100%", height: "auto", background: "none", border: "none", color: "#DEDBFF"}}
                        />
                    </div>
                    <div className={styles.description}>
                        <input 
                            type="text" 
                            placeholder="tag" 
                            value={formData.tag}
                            onChange={(e) => handleInputChange("tag", e.target.value)}
                            style={{fontSize: "20px", width: "100%", height: "auto", background: "none", border: "none", color: "#DEDBFF"}}
                        />
                    </div>
                    <textarea 
                        placeholder="content" 
                        value={formData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        style={{fontSize: "20px", width: "100%", height: "560px", background: "#DEDBFF", border: "none", color: "#2C2E47", borderRadius: "10px"}}
                    />
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "更新中..." : "更新"}
                </button>
                <Footer />
            </div>
        </ProtectedRoute>
    );
} 