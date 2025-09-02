"use client";

import { useRouter } from "next/navigation";
import { UserService } from "../modules/users/user-service";
import "./page.css";

export default function Home() {
    const router = useRouter();

    const handleAdminLogin = async () => {
        try {
            await UserService.fetchAndStoreUser("admin");
            router.push("/home");
        } catch (error) {
            console.error("Admin login failed:", error);
        }
    };

    const handleUserLogin = async () => {
        try {
            await UserService.fetchAndStoreUser("user");
            router.push("/home");
        } catch (error) {
            console.error("User login failed:", error);
        }
    };

    return (
        <div className="login-container">
            <main>
                <h1>Concert Management System</h1>
                <p>Please select your login type to continue</p>

                <div className="button-container">
                    <button onClick={handleAdminLogin} className="login-button">
                        Login as Admin
                    </button>
                    <button onClick={handleUserLogin} className="login-button">
                        Login as User
                    </button>
                </div>
            </main>
        </div>
    );
}
