"use client";

import { ReactNode } from "react";
import Sidebar from "@/shared/components/ui/sidebar/Sidebar";
import "./dashboard.css";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-content">{children}</div>
            </main>
        </div>
    );
}
