import { AdminHeader } from "../component/adminHeader/adminHeader";
import { Footer } from "../component/Footer/Footer";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";

export default function Admin() {
    return (
        <ProtectedRoute>
            <div className={styles.frame}>
                <AdminHeader />
                <main className={styles.admin}>
                    <h1>Admin</h1>
                    <div className={styles.adminSelect}>
                        <Link to="/admin/blog">
                            <div className={styles.adminSection}>
                                <span>📚</span>
                                <h2>Blog</h2>
                            </div>
                        </Link>
                        <Link to="/admin/works">
                            <div className={styles.adminSection}>
                                <span>💻</span>
                                <h2>Works</h2>
                            </div>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
