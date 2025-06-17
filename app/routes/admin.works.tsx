import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { AdminWorkItem } from "../component/adminWorkItem/adminWorkItem";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface WorkData {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
}

export default function AdminWorks() {
    const [works, setWorks] = useState<WorkData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const worksQuery = query(
                    collection(db, "works"),
                    orderBy("updatedAt", "desc")
                );
                const querySnapshot = await getDocs(worksQuery);
                
                const worksData: WorkData[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    worksData.push({
                        id: doc.id,
                        thumbnail: data.thumbnail || "",
                        title: data.title || "",
                        description: data.description || ""
                    });
                });
                
                setWorks(worksData);
            } catch (error) {
                console.error("作品の取得に失敗しました:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorks();
    }, []);

    return (
        <div className={styles.frame}>
            <AdminHeader />
            <div className={styles.adminManagement}>
                <h1>Worksの管理</h1>
                <div className={styles.newCreate}>
                    <Link to="/work/new">
                        <button>New Create</button>
                    </Link>
                </div>
                <div className={styles.adminWorksList}>
                    {isLoading ? (
                        <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                            読み込み中...
                        </div>
                    ) : works.length === 0 ? (
                        <div style={{color: "#DEDBFF", textAlign: "center", padding: "20px"}}>
                            作品がありません
                        </div>
                    ) : (
                        works.map((work) => (
                            <AdminWorkItem 
                                key={work.id}
                                id={work.id}
                                thumbnail={work.thumbnail}
                                title={work.title}
                                description={work.description}
                            />
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}