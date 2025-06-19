import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TwitterEmbed } from "./TwitterEmbed";

interface TwitterEmbedPortalProps {
    container: HTMLElement;
    url: string;
}

export function TwitterEmbedPortal({ container, url }: TwitterEmbedPortalProps): ReactNode {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return createPortal(
        <TwitterEmbed url={url} />,
        container
    );
} 