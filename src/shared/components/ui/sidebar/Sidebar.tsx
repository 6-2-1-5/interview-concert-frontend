"use client";

import { Home, Inbox, RefreshCw, LogOut, Menu, X } from "lucide-react";
import "./sidebar.css";
import { UserRole } from "@/modules/users/shared/types/user-entity";
import { LucideIcon } from "lucide-react";
import { UserService } from "@/modules/users/user-service";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
    label: string;
    href?: string;
    icon: LucideIcon;
    role: UserRole[];
    onClick?: () => void;
}

export default function Sidebar({ userRole }: { userRole: UserRole }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleRoleSwitch = async () => {
        try {
            const newRole: UserRole = userRole === "admin" ? "user" : "admin";
            await UserService.fetchAndStoreUser(newRole);
            window.location.reload();
        } catch (error) {
            console.error("Role switch failed:", error);
        }
    };

    const handleLogout = () => {
        UserService.clearUserFromStorage();
        router.push("/");
    };

    const navItems: NavItem[] = [
        { label: "Home", href: "/home", icon: Home, role: ["user", "admin"] },
        { label: "History", href: "/history", icon: Inbox, role: ["admin"] },
        {
            label: `Switch to ${userRole === "admin" ? "user" : "admin"}`,
            icon: RefreshCw,
            role: ["admin", "user"],
            onClick: handleRoleSwitch,
        },
    ];

    const filteredNavItems = navItems.filter((item) => item.role.includes(userRole));

    return (
        <>
            <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
            </button>

            <aside className={`sidebar ${isMobileMenuOpen ? "sidebar-mobile-open" : ""}`}>
                <div className="sidebar-header">
                    <h1 className="header-title">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</h1>
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        {filteredNavItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = item.href && pathname === item.href;
                            return (
                                <li key={index} className="nav-item">
                                    {item.onClick ? (
                                        <button onClick={item.onClick} className="nav-link nav-button">
                                            <span className="nav-icon">
                                                <IconComponent size={20} />
                                            </span>
                                            <span className="nav-label">{item.label}</span>
                                        </button>
                                    ) : (
                                        <a href={item.href} className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
                                            <span className="nav-icon">
                                                <IconComponent size={20} />
                                            </span>
                                            <span className="nav-label">{item.label}</span>
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="nav-link nav-button">
                        <span className="nav-icon">
                            <LogOut size={20} />
                        </span>
                        <span className="nav-label">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
