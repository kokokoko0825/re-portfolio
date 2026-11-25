import { Timestamp } from "firebase/firestore";
import { typeStyle } from "~/styles/tokens";

export function DateText({ value }: { value: Timestamp | null }) {
    if (!value) return null;
    const date = value.toDate();
    const formatted = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(date);
    return (
        <time dateTime={formatted.replaceAll("/", "-")} style={typeStyle("footnote")}>
            {formatted}
        </time>
    );
}
