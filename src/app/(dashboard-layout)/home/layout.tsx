"use client";

import React from "react";
import { UserService } from "@/modules/users/user-service";

interface HomeLayoutProps {
    children: React.ReactNode;
    admin: React.ReactNode;
    user: React.ReactNode;
}

export default function HomeLayout({ children, admin, user }: HomeLayoutProps) {
    // In a real-world application, we should verify the token by calling an API since this is a sensitive part
    // However, we did not implement authentication and tokens as they were not included in the requirements
    const currentUser = UserService.getUserFromStorage();
    const userRole = currentUser?.role;

    if (userRole === "admin") {
        return admin;
    } else if (userRole === "user") {
        return user;
    }
    return children;
}
