import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { AdminBlogItem } from "../component/adminBlogItem/adminBlogItem";

export default function AdminBlog() {
    return (
        <div className={styles.frame}>
            <AdminHeader />
            <div className={styles.adminManagement}>
                <h1>Blogの管理</h1>
                <div className={styles.newCreate}>
                    <Link to="/admin/blog/new">
                        <button>New Create</button>
                    </Link>
                </div>
                <AdminBlogItem />
                <AdminBlogItem />
                <AdminBlogItem />
                <AdminBlogItem />
            </div>
            <Footer />
        </div>
    );
}