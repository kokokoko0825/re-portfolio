import { ReactNode } from "react";
import { Article } from "./Article";
import * as styles from "./styles.css";

// 記事データの型定義
export interface ArticleData {
    id: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    date?: string;
    url?: string;
}

interface ArticleListProps {
    articles: ArticleData[];
}

export const ArticleList = ({ articles }: ArticleListProps): ReactNode => {
    return (
        <div className={styles.articleList}>
            {articles.length === 0 ? (
                <p>記事がありません</p>
            ) : (
                articles.map((article) => (
                    <Article
                        key={article.id}
                        title={article.title}
                        description={article.description}
                        thumbnailUrl={article.thumbnailUrl}
                        date={article.date}
                        url={article.url}
                    />
                ))
            )}
        </div>
    );
}; 