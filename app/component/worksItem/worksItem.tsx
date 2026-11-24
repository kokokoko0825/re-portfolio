import { ReactNode, useState } from "react";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

interface WorksItemProps {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
}

export function WorksItem({ id, thumbnail, title, description }: WorksItemProps): ReactNode {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Link to={`/works/${id}`} className={styles.cardLink}>
            <div className={styles.worksItem}>
                {isLoading && (
                    <img src="/images/Loading.png" alt="" className={styles.thumbnail} />
                )}
                <img
                    src={thumbnail || "/images/icon.jpg"}
                    alt=""
                    className={styles.thumbnail}
                    onLoad={handleImageLoad}
                    style={{ display: isLoading ? "none" : "block" }}
                />
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
}
