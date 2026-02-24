import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { BlogItem } from "../component/blogItem";
import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import { vars } from "../styles/theme.css";
import { normalizeBlogTags } from "../utils/blogTags";

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Koshi Tanakaのブログ" },
    { name: "og:title", content: "Blog | kokokoko0825"},
    { name: "og:description", content: "Koshi Tanakaのブログ"},
    { name: "og:url", content: "https://kokokoko0825.dev/blog"},
    { name: "og:image", content: "/images/icon.png"},
    { name: "og:image:url", content: "/images/icon.png"},
    { name: "og:image:alt", content: "kokokoko0825"},
    { name: "og:type", content: "website"},
    { name: "robots", content: "noindex, nofollow" },
  ];
};

interface BlogData {
    id: string;
    number: number;
    title: string;
    thumbnail: string;
    createdAt: Timestamp;
    externalUrl: string;
    tags: string[];
}

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTag = searchParams.get("tag") ?? null;

    useEffect(() => {
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
                        thumbnail: data.thumbnail || "",
                        createdAt: data.createdAt || null,
                        externalUrl: data.externalUrl || "",
                        tags: normalizeBlogTags(data),
                    });
                });

                setBlogs(blogsData);
            } catch (error) {
                console.error("ブログ記事の取得に失敗しました:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const allTags = useMemo(
        () => Array.from(new Set(blogs.flatMap((b) => b.tags))).sort(),
        [blogs]
    );
    const filteredBlogs = useMemo(
        () =>
            selectedTag
                ? blogs.filter((b) => b.tags.includes(selectedTag))
                : blogs,
        [blogs, selectedTag]
    );

    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.blog}>
                <h1>Blog</h1>
                {allTags.length > 0 && (
                    <div className={styles.tagFilters}>
                        <button
                            type="button"
                            className={selectedTag === null ? styles.tagFilterActive : styles.tagFilter}
                            onClick={() => setSearchParams({})}
                        >
                            すべて
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                className={selectedTag === tag ? styles.tagFilterActive : styles.tagFilter}
                                onClick={() => setSearchParams({ tag })}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
                {isLoading ? (
                    <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                        読み込み中...
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div style={{color: vars.color.text, textAlign: "center", padding: "20px"}}>
                        {selectedTag ? `タグ「${selectedTag}」の記事はありません` : "ブログ記事がありません"}
                    </div>
                ) : (
                    filteredBlogs.map((blog) => (
                        <BlogItem
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            createdAt={blog.createdAt}
                            externalUrl={blog.externalUrl}
                            tags={blog.tags}
                        />
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}