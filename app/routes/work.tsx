import { Outlet } from "@remix-run/react";
import { ReactNode } from "react";
import { AdminMenuProvider } from "../contexts/AdminMenuContext";

export default function WorkLayout(): ReactNode {
    return (
        <AdminMenuProvider>
            <Outlet />
        </AdminMenuProvider>
    );
} 