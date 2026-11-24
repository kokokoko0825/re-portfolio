import { Timestamp } from "firebase/firestore";
import { typeStyle } from "~/styles/tokens";

export function DateText({ value }: { value: Timestamp | null }) {
    if (!value) return null;
    const date = value.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return (
        <time dateTime={`${year}-${month}-${day}`} style={typeStyle("footnote")}>
            {date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </time>
    );
}
