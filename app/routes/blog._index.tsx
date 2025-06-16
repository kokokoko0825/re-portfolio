import { Header } from "../component/Header/Header";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { BlogItem } from "../component/blogItem";

export default function Blog() {
    return (
        <div className={styles.frame}>
            <Header />
            <div className={styles.blog}>
                <h1>Blog</h1>
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
            <Footer />
        </div>
    );
}