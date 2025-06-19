import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { BlogItem } from "../blogItem";
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface AdminBlogItemProps {
    id: string;
    title: string;
    createdAt: Timestamp | null;
    onDelete: (deletedId: string) => void;
}

export function AdminBlogItem({ id, title, createdAt, onDelete }: AdminBlogItemProps): ReactNode {
    const handleDelete = async () => {
        const isConfirmed = window.confirm(`「${title}」を削除しますか？\nこの操作は取り消せません。`);
        
        if (isConfirmed) {
            try {
                await deleteDoc(doc(db, "blogs", id));
                console.log("ブログ記事が正常に削除されました。ID: ", id);
                alert("ブログ記事が正常に削除されました！");
                
                // 親コンポーネントに削除完了を通知
                onDelete(id);
            } catch (error) {
                console.error("削除中にエラーが発生しました: ", error);
                alert("削除中にエラーが発生しました");
            }
        }
    };

    return (
        <div className={styles.adminBlogItem}>
            <BlogItem id={id} title={title} createdAt={createdAt} />
            <div className={styles.adminItemIcon}>
                <Link to={`/blog/edit/${id}`}>
                    <h1>✏️</h1>
                </Link>
                <button 
                    onClick={handleDelete} 
                    style={{
                        cursor: "pointer", 
                        background: "none", 
                        border: "none", 
                        fontSize: "36px",
                        padding: "0",
                        margin: "0"
                    }}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}