import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState } from "react";
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";

export default function AdminBlogNew() {
    const [formData, setFormData] = useState({
        thumbnail: "",
        title: "",
        description: "",
        tag: "",
        content: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getNextBlogNumber = async (): Promise<number> => {
        try {
            const blogsQuery = query(
                collection(db, "blogs"),
                orderBy("number", "desc")
            );
            const querySnapshot = await getDocs(blogsQuery);
            
            if (querySnapshot.empty) {
                return 1; // 最初の記事
            }
            
            // 最新の記事のナンバーを取得して+1
            const latestBlog = querySnapshot.docs[0];
            const latestNumber = latestBlog.data().number || 0;
            return latestNumber + 1;
        } catch (error) {
            console.error("次のナンバーの取得に失敗しました:", error);
            return 1; // エラーの場合は1から開始
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            alert("タイトルとコンテンツは必須です");
            return;
        }

        setIsLoading(true);
        try {
            const nextNumber = await getNextBlogNumber();
            
            const blogData = {
                number: nextNumber, // ナンバリングを追加
                thumbnail: formData.thumbnail, // 絵文字をそのまま保存
                title: formData.title,
                description: formData.description,
                tag: formData.tag,
                content: formData.content,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "blogs"), blogData);
            console.log("ブログが正常に保存されました。ID: ", docRef.id, "ナンバー: ", nextNumber);
            alert("ブログが正常に保存されました！");
            
            // フォームをリセット
            setFormData({
                thumbnail: "",
                title: "",
                description: "",
                tag: "",
                content: ""
            });
        } catch (error) {
            console.error("エラーが発生しました: ", error);
            alert("保存中にエラーが発生しました");
        } finally {
            setIsLoading(false);
        }
    };

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
                    {isLoading ? "保存中..." : "保存"}
                </button>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}