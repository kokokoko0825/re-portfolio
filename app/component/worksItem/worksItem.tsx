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
        <Link to={`/works/${id}`}>
            <div className={styles.worksItem}>
                {isLoading && (
                    <img src="/images/Loading.png" alt="Loading" />
                )}
                <img
                    src={thumbnail || "/images/icon.jpg"}
                    alt="thumbnail"
                    onLoad={handleImageLoad}
                    style={{ display: isLoading ? "none" : "block" }}
                />
                <h2 style={{ wordBreak: "break-word" }}>{title}</h2>
                <small style={{ wordBreak: "break-word" }}>{description}</small>
            </div>
        </Link>
    );
}