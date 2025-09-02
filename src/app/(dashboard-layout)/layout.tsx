"use client";

import { ReactNode, useEffect } from "react";
import Sidebar from "@/shared/components/ui/sidebar/Sidebar";
import "./dashboard.css";
import { UserService } from "@/modules/users/user-service";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const userRole = UserService.getUserFromStorage()?.role;

    useEffect(() => {
        if (!userRole) {
            UserService.clearUserFromStorage();
        }
    }, [userRole]);

    if (!userRole) {
        return null;
    }

    return (
        <div className="dashboard-layout">
            <Sidebar userRole={userRole} />
            <main className="dashboard-main">
                <div className="dashboard-content">{children}</div>
            </main>
        </div>
    );
}
