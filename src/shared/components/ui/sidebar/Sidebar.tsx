"use client";

import { Home, Inbox, RefreshCw, LogOut } from "lucide-react";
import "./sidebar.css";
import { UserRole } from "@/modules/users/shared/user/types";

export default function Sidebar({ userRole }: { userRole: UserRole }) {
    const navItems = [
        { label: "Home", href: "/home", icon: Home },
        { label: "History", href: "/history", icon: Inbox },
        { label: "Switch to user", href: "#", icon: RefreshCw },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="header-title">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</h1>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <a href={item.href} className="nav-link">
                                <span className="nav-icon">
                                    <item.icon size={20} />
                                </span>
                                <span className="nav-label">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <a href="#" className="nav-link">
                    <span className="nav-icon">
                        <LogOut size={20} />
                    </span>
                    <span className="nav-label">Logout</span>
                </a>
            </div>
        </aside>
    );
}
