import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { WorksItem } from "../component/worksItem";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Koshi Tanakaの作品" },
    { name: "og:title", content: "Works | kokokoko0825"},
    { name: "og:description", content: "Koshi Tanakaの作品"},
    { name: "og:url", content: "https://kokokoko0825.dev/works"},
    { name: "og:image", content: "/images/icon.png"},
    { name: "og:image:url", content: "/images/icon.png"},
    { name: "og:image:alt", content: "kokokoko0825"},
    { name: "og:type", content: "website"},
    { name: "robots", content: "noindex, nofollow" },
  ];
};

interface WorkData {
    id: string;
    number: number;
    thumbnail: string;
    title: string;
    description: string;
}

export default function Works() {
    const [works, setWorks] = useState<WorkData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const worksQuery = query(
                    collection(db, "works"),
                    orderBy("number", "desc")
                );
                const querySnapshot = await getDocs(worksQuery);
                
                const worksData: WorkData[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    worksData.push({
                        id: doc.id,
                        number: data.number || 0,
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
            <Header />
            <div className={styles.works}>
                <h1>Works</h1>
                <div className={styles.workList}>
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
                            <WorksItem 
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