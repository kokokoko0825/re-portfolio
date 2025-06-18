import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useParams, useNavigate } from "@remix-run/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminWorkEdit() {
    const { workId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        thumbnail: "",
        title: "",
        description: "",
        content: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const fetchWorkData = async () => {
            if (!workId) {
                alert("作品IDが指定されていません");
                navigate("/admin");
                return;
            }

            try {
                const workDoc = doc(db, "works", workId);
                const workSnapshot = await getDoc(workDoc);

                if (workSnapshot.exists()) {
                    const data = workSnapshot.data();
                    setFormData({
                        thumbnail: data.thumbnail || "",
                        title: data.title || "",
                        description: data.description || "",
                        content: data.content || ""
                    });
                } else {
                    alert("作品が見つかりません");
                    navigate("/admin");
                }
            } catch (error) {
                console.error("作品の取得に失敗しました:", error);
                alert("作品の取得に失敗しました");
                navigate("/admin");
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchWorkData();
    }, [workId, navigate]);

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
            let thumbnailURL = formData.thumbnail;
            
            if (selectedFile) {
                thumbnailURL = await uploadFileToStorage(selectedFile);
            }

            const workData = {
                thumbnail: thumbnailURL,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                updatedAt: serverTimestamp()
            };

            const workDoc = doc(db, "works", workId!);
            await updateDoc(workDoc, workData);
            
            console.log("作品が正常に更新されました。ID: ", workId);
            alert("作品が正常に更新されました！");
            
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
            <div className={styles.frame}>
                <AdminHeader />
                <div className={styles.adminnewCreate}>
                    <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
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
                {formData.thumbnail && !selectedFile && (
                    <div style={{color: "#DEDBFF", fontSize: "14px", margin: "10px 0"}}>
                        現在のサムネイル: {formData.thumbnail}
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
                {isLoading ? "更新中..." : "更新"}
            </button>
            <Footer />
        </div>
    );
}
