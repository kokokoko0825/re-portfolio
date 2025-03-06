import { Outlet, Link } from "@remix-run/react";

export default function BlogLayout() {
    return (
        <div>
            <Link to="/blog">Blog</Link>
            <Link to="/blog/new">新規作成</Link> | <Link to="/blog/list">一覧</Link>
            <Outlet />
        </div>
    );
}