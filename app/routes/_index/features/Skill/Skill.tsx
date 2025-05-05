import { ReactNode } from "react";
import { SkillSheet } from "~/component/SkillSheet";
import * as styles from "./styles.css";

const skills = [
    {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        level: 3
    },
    {
        name: "css",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg",
        level: 3
    },
    {
        name: "html",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg",
        level: 3
    },
    {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        level: 3
    },
    {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        level: 2
    },
    {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        level: 2
    },
    {
        name: "Remix",
        icon: "/images/remix-run-fill-2.png",
        level: 3
    },
    {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        level: 3
    },
    {
        name: "Cloudflare",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
        level: 2
    },
    {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain-wordmark.svg",
        level: 2
    },
    




    // 他のスキルを追加
];

export const Skill = (): ReactNode => {
    return (
        <div id="skill" className={styles.skill}>
            <div className={styles.subtitleFrame}>
                <div className={styles.subTitle}>Skill</div>
            </div>
            <SkillSheet skills={skills} />
            <div className={styles.text}>このスキルシートは<br />★1:授業などで触る程度<br />★2:勉強中<br />★3:それなりに開発をしている<br />★4:詰まらずに開発ができる<br />★5:つよつよエンジニア<br />という評価分けになっています。</div>
        </div>
    );
};