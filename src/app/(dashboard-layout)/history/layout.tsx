"use client";

import React, { useEffect, useState } from "react";
import { UserService } from "@/modules/users/user-service";
import { UserRole } from "@/modules/users/shared/types/user-entity";

interface HistoryLayoutProps {
    children: React.ReactNode;
    admin: React.ReactNode;
    user: React.ReactNode;
}

export default function HistoryLayout({ children, admin, user }: HistoryLayoutProps) {
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    useEffect(() => {
        // In a real-world application, we should verify the token by calling an API since this is a sensitive part
        // However, we did not implement authentication and tokens as they were not included in the requirements
        const currentUser = UserService.getUserFromStorage();
        const role = currentUser?.role || null;
        setUserRole(role);
    }, []);

    if (userRole === "admin") {
        return admin;
    } else if (userRole === "user") {
        return user;
    }
    return children;
}
