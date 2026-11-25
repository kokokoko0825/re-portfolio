import { Fragment } from "react";
import { splitPhrases } from "~/utils/phraseText";
import { phrase as phraseClass } from "./PhraseText.css";

export function PhraseText({ children }: { children: string }) {
    return <>{splitPhrases(children).map((phrase, index) => (
        <Fragment key={index}>{index > 0 && <wbr />}<span className={phraseClass}>{phrase}</span></Fragment>
    ))}</>;
}
