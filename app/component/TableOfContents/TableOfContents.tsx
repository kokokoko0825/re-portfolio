import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "@remix-run/react";
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
    const accordionRef = useRef<HTMLDetailsElement>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        // h2〜h5 を目次対象にする
        const headings = Array.from(container.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id], h5[id]"));
        setActiveId(null);
        const tocItems: TocItem[] = [];

        headings.forEach((el) => {
            const id = el.id;
            if (!id) return;
            const text = el.textContent?.trim() ?? "";
            const level = parseInt(el.tagName.charAt(1), 10) - 1;
            tocItems.push({ id, text, level });
        });

        if (tocItems.length === 0) {
            setItems([]);
            return;
        }
        const minLevel = Math.min(...tocItems.map(item => item.level));
        setItems(tocItems.map(item => ({ ...item, level: item.level - minLevel + 1 })));

        // 120pxの基準線を最後に通過した見出しを選ぶ。
        const updateActive = () => {
            let current: string | null = null;
            for (const heading of headings) {
                if (heading.getBoundingClientRect().top <= 120) current = heading.id;
            }
            if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                current = headings[headings.length - 1].id;
            }
            setActiveId(current);
        };
        const observer = new IntersectionObserver(updateActive, {
            rootMargin: "-120px 0px 0px 0px",
        });
        headings.forEach(heading => observer.observe(heading));
        window.addEventListener("scroll", updateActive, { passive: true });
        window.addEventListener("resize", updateActive);
        updateActive();
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", updateActive);
            window.removeEventListener("resize", updateActive);
        };
    }, [contentRef, contentKey]);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 769px)");
        const syncOpen = () => {
            if (accordionRef.current) accordionRef.current.open = desktop.matches;
        };
        syncOpen();
        desktop.addEventListener("change", syncOpen);
        return () => desktop.removeEventListener("change", syncOpen);
    }, [items.length, contentKey]);

    if (items.length === 0) return null;

    return (
        <details ref={accordionRef} className={styles.tocAccordion}>
            <summary className={styles.tocSummary}>
                <span>目次 · {items.length}項目</span>
                <svg className={styles.tocChevron} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </summary>
            <div className={styles.tocTitle}>目次</div>
            <nav className={styles.tocNav} aria-label="目次">
                <ul className={styles.tocList}>
                    {items.map((item) => (
                        <li key={item.id} className={styles.tocListItem}>
                            <Link
                                to={`#${encodeURIComponent(item.id)}`}
                                aria-current={activeId === item.id ? "location" : undefined}
                                onClick={(event) => {
                                    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                                        setActiveId(item.id);
                                        // 閉じた後の本文位置をRemixのハッシュ遷移に使わせる。
                                        if (window.matchMedia("(max-width: 768px)").matches && accordionRef.current) {
                                            accordionRef.current.open = false;
                                        }
                                    }
                                }}
                                className={`${styles.tocLink} ${item.level > 1 ? styles.tocLinkNested : ""} ${activeId === item.id ? styles.tocLinkActive : ""} ${
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
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </details>
    );
}
