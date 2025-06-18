import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState } from "react";
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";

export default function AdminWorkNew() {
    const [formData, setFormData] = useState({
        thumbnail: "",
        title: "",
        description: "",
        content: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // ファイル名をthumbnailフィールドに設定
            handleInputChange("thumbnail", file.name);
        }
    };

    const getNextWorkNumber = async (): Promise<number> => {
        try {
            const worksQuery = query(
                collection(db, "works"),
                orderBy("number", "desc")
            );
            const querySnapshot = await getDocs(worksQuery);
            
            if (querySnapshot.empty) {
                return 1; // 最初の作品
            }
            
            // 最新の作品のナンバーを取得して+1
            const latestWork = querySnapshot.docs[0];
            const latestNumber = latestWork.data().number || 0;
            return latestNumber + 1;
        } catch (error) {
            console.error("次のナンバーの取得に失敗しました:", error);
            return 1; // エラーの場合は1から開始
        }
    };

    const uploadFileToStorage = async (file: File): Promise<string> => {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `thumbnails/${fileName}`);
        
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        return downloadURL;
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            alert("タイトルとコンテンツは必須です");
            return;
        }

        setIsLoading(true);
        try {
            const nextNumber = await getNextWorkNumber();
            let thumbnailURL = "";
            
            // ファイルが選択されている場合はStorageにアップロード
            if (selectedFile) {
                thumbnailURL = await uploadFileToStorage(selectedFile);
            }

            const workData = {
                number: nextNumber, // ナンバリングを追加
                thumbnail: thumbnailURL, // StorageのURLを保存
                title: formData.title,
                description: formData.description,
                content: formData.content,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "works"), workData);
            console.log("作品が正常に保存されました。ID: ", docRef.id, "ナンバー: ", nextNumber);
            alert("作品が正常に保存されました！");
            
            // フォームをリセット
            setFormData({
                thumbnail: "",
                title: "",
                description: "",
                content: ""
            });
            setSelectedFile(null);
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
                        type="file" 
                        placeholder="thumbnail" 
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{width: "auto", height: "auto", textAlign: "center", border: "none", background: "none", color: "#DEDBFF"}} 
                    />
                    {selectedFile && (
                        <div style={{color: "#DEDBFF", fontSize: "14px", margin: "10px 0"}}>
                            選択されたファイル: {selectedFile.name}
                        </div>
                    )}
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