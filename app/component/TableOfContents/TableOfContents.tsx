import { useEffect, useState, type RefObject } from "react";
import * as styles from "./TableOfContents.css";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentRef: RefObject<HTMLDivElement | null>;
    contentKey?: string;
}

export function TableOfContents({ contentRef, contentKey }: TableOfContentsProps) {
    const [items, setItems] = useState<TocItem[]>([]);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        // h1〜h4 を目次対象にする
        const headings = container.querySelectorAll("h1, h2, h3, h4");
        const tocItems: TocItem[] = [];

        headings.forEach((el) => {
            const id = el.id;
            if (!id) return;
            const text = el.textContent?.trim() ?? "";
            const level = parseInt(el.tagName.charAt(1), 10);
            tocItems.push({ id, text, level });
        });

        setItems(tocItems);
    }, [contentRef, contentKey]);

    if (items.length === 0) return null;

    return (
        <nav className={styles.tocNav} aria-label="目次">
            <ul className={styles.tocList}>
                {items.map((item) => (
                    <li key={item.id} className={styles.tocListItem}>
                        <a
                            href={`#${item.id}`}
                            className={`${styles.tocLink} ${
                                item.level === 1
                                    ? styles.tocLinkLevel1
                                    : item.level === 2
                                      ? styles.tocLinkLevel2
                                      : item.level === 3
                                        ? styles.tocLinkLevel3
                                        : styles.tocLinkLevel4
                            }`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
