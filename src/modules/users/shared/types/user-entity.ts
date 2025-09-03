export type UserRole = "admin" | "user";

export type User = {
    id: number;
    name: string;
    role: UserRole;
};
