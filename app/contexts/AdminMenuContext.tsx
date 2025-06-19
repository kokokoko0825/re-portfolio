import { ReactNode, createContext, useContext, useState } from "react";

interface AdminMenuContextType {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

const AdminMenuContext = createContext<AdminMenuContextType | undefined>(undefined);

export function AdminMenuProvider({ children }: { children: ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <AdminMenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
            {children}
        </AdminMenuContext.Provider>
    );
}

export function useAdminMenu(): AdminMenuContextType {
    const context = useContext(AdminMenuContext);
    if (context === undefined) {
        throw new Error("useAdminMenu must be used within an AdminMenuProvider");
    }
    return context;
} 