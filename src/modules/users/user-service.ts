import { User, UserRole } from "./shared/user/types";

const USER_STORAGE_KEY = "user";

export class UserService {
    static async fetchAndStoreUser(role: UserRole): Promise<User> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/accounts/${role}`);

            const userData: User = await response.json();
            this.saveUserToStorage(userData);
            return userData;
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            throw error;
        }
    }

    static saveUserToStorage(user: User): void {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }

    static getUserFromStorage(): User | null {
        try {
            const userData = localStorage.getItem(USER_STORAGE_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            return null;
        }
    }

    static clearUserFromStorage(): void {
        localStorage.removeItem(USER_STORAGE_KEY);
    }
}
