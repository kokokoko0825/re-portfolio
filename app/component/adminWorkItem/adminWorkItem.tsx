import { typeStyle } from "~/styles/tokens";
import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { WorksItem } from "../worksItem/worksItem";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface AdminWorkItemProps {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
    onDelete: (deletedId: string) => void;
}

export function AdminWorkItem({ id, thumbnail, title, description, onDelete }: AdminWorkItemProps): ReactNode {
    const handleDelete = async () => {
        const isConfirmed = window.confirm(`「${title}」を削除しますか？\nこの操作は取り消せません。`);

        if (isConfirmed) {
            try {
                await deleteDoc(doc(db, "works", id));
                console.log("作品が正常に削除されました。ID: ", id);
                alert("作品が正常に削除されました！");

                // 親コンポーネントに削除完了を通知
                onDelete(id);
            } catch (error) {
                console.error("削除中にエラーが発生しました: ", error);
                alert("削除中にエラーが発生しました");
            }
        }
    };

    return (
        <div className={styles.adminWorkItem}>
            <WorksItem id={id} thumbnail={thumbnail} title={title} description={description} />
            <div className={styles.adminItemIcon}>
                <Link to={`/work/edit/${id}`} aria-label="編集">
                    <span aria-hidden="true" className={styles.editIcon}>✏️</span>
                </Link>
                <button 
                    onClick={handleDelete} 
                    style={{
                        cursor: "pointer", 
                        background: "none", 
                        border: "none", 
                        ...typeStyle("uiBody"),
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
