import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { WorksItem } from "../component/worksItem";

export default function Works() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.works}>
                <h1>Works</h1>
                <div className={styles.workList}>
                    <WorksItem />
                    <WorksItem />
                    <WorksItem />
                    <WorksItem />
                </div>
            </div>
            <Footer />
        </div>
    );
}