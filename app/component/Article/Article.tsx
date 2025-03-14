import { ReactNode } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

interface ArticleProps {
    title: string;
    description: string;
    thumbnailUrl?: string;
    date?: string;
    url?: string;
}

const formatDate = (dateString: string): string => {
    if (!dateString) {
        return "日付が無効です"; // デフォルトのエラーメッセージ
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "日付が無効です"; // 無効な日付の場合のメッセージ
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
};

export const Article = ({ title, description, thumbnailUrl, date, url }: ArticleProps): ReactNode => {
    return (
        <Link to={url ?? ""} className={styles.articleLink}>
            <div className={styles.article}>
                <div className={styles.thumbnail} style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined}></div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    {date && <div className={styles.date}>{formatDate(date)}</div>}
                    <p className={styles.description}>{description}</p>
                    <div className={styles.readMore}>
                        続きを読む
                    </div>
                </div>
            </div>
        </Link>
    );
}