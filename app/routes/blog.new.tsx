import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import * as styles from "./styles.css";
import { useNavigate } from "@remix-run/react";
import { checkLoginState } from "./admin";

export default function NewBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const navigate = useNavigate();

    // ページ読み込み時にログイン状態をチェック
    useEffect(() => {
        // クライアントサイドでのみ実行されるようにする
        if (typeof window !== "undefined") {
            const isLoggedIn = checkLoginState();
            if (!isLoggedIn) {
                // ログインしていない場合は管理者ログインページにリダイレクト
                navigate("/admin");
            }
        }
    }, [navigate]);

    const onDrop = (acceptedFiles: File[]) => {
        console.log("ファイルがドロップされました:", acceptedFiles);
        if (acceptedFiles.length > 0) {
            setThumbnail(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let url = "";
        if (thumbnail) {
            const storage = getStorage();
            const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
            await uploadBytes(storageRef, thumbnail);
            url = await getDownloadURL(storageRef);
            setThumbnailUrl(url);
        }

        await addDoc(collection(db, "blogPosts"), {
            title,
            content,
            thumbnail: url,
            createdAt: new Date().toISOString(),
        });

        setTitle("");
        setContent("");
        setThumbnail(null);
        setThumbnailUrl("");
    };

    return (
        <div className={styles.frame}>
            <div className={styles.subTitle}>Create New Blog</div>
            <form onSubmit={handleSubmit} style={{ width: "80%", justifySelf: "stretch" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', width: "auto", justifySelf: "stretch" }}>
                    <input {...getInputProps()} />
                    {thumbnail ? <p>{thumbnail.name}</p> : <p>Drag & drop a thumbnail here, or click to select one</p>}
                </div>
                <textarea
                    className={styles.form}
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}