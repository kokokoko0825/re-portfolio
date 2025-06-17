import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { AdminWorkItem } from "../component/adminWorkItem/adminWorkItem";

export default function AdminWorks() {
    return (
        <div className={styles.frame}>
            <AdminHeader />
            <div className={styles.adminManagement}>
                <h1>Worksの管理</h1>
                <div className={styles.newCreate}>
                    <Link to="/work/new">
                        <button>New Create</button>
                    </Link>
                </div>
                <div className={styles.adminWorksList}>
                    <AdminWorkItem />
                    <AdminWorkItem />
                    <AdminWorkItem />
                    <AdminWorkItem />
                </div>
            </div>
            <Footer />
        </div>
    );
}