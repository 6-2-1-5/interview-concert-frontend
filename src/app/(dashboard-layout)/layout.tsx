"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/shared/components/ui/sidebar/Sidebar";
import "./dashboard.css";
import { UserService } from "@/modules/users/user-service";
import { UserRole } from "@/modules/users/shared/user/types";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    useEffect(() => {
        const user = UserService.getUserFromStorage();
        const role = user?.role || null;
        setUserRole(role);
        if (!role) {
            UserService.clearUserFromStorage();
        }
    }, []);

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
