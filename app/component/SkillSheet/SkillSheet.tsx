import { ReactNode } from "react";
import * as styles from "./styles.css";

interface SkillData {
    name: string;
    icon: string;
    level: number; // 1-5の評価
}

interface SkillSheetProps {
    skills: SkillData[];
}

const StarRating = ({ level }: { level: number }) => {
    return (
        <div className={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`${styles.star} ${index < level ? styles.starFilled : styles.starEmpty
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export const SkillSheet = ({ skills }: SkillSheetProps): ReactNode => {
    return (
        <div className={styles.skillSheet}>
            <div className={styles.skillGrid}>
                {skills.map((skill, index) => (
                    <div key={index} className={styles.skillCard}>
                        <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            className={styles.skillIcon}
                        />
                        <h3 className={styles.skillName}>{skill.name}</h3>
                        <StarRating level={skill.level} />
                    </div>
                ))}
            </div>
        </div>
    );
};